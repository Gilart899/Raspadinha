// ===========================================
// SORTEIO TRANSACIONAL
// ===========================================

import {
    getDB
} from "./firebase.js";

import {
    ref,
    runTransaction,
    push,
    set,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

// ===========================================

const db = () => getDB();

// ===========================================

export async function realizarSorteio(participante) {

    const premiosRef = ref(db(), "premios");

    const resultado = await runTransaction(premiosRef, (premios) => {

        if (!premios) return premios;

        const disponiveis = Object.entries(premios)
            .filter(([id, premio]) => premio.quantidade > 0);

        if (!disponiveis.length) {

            return premios;

        }

        const indice = Math.floor(Math.random() * disponiveis.length);

        const [idPremio] = disponiveis[indice];

        premios[idPremio].quantidade--;

        premios[idPremio].ultimoGanhador = participante.cpf;

        premios[idPremio].ultimaData = Date.now();

        premios.__resultado = idPremio;

        return premios;

    });

    if (!resultado.committed) {

        return {
            ganhou: false
        };

    }

    const dados = resultado.snapshot.val();

    const premioId = dados.__resultado;

    delete dados.__resultado;

    if (!premioId) {

        await registrarTentativa(participante);

        return {
            ganhou: false
        };

    }

    const premio = dados[premioId];

    await salvarVencedor(participante, premio);

    return {

        ganhou: true,

        id: premioId,

        nome: premio.nome,

        imagem: premio.imagem

    };

}

// ===========================================

async function salvarVencedor(participante, premio) {

    const novo = push(ref(db(), "vencedores"));

    await set(novo, {

        nome: participante.nome,

        cpf: participante.cpf,

        telefone: participante.telefone,

        premio: premio.nome,

        data: serverTimestamp()

    });

}

// ===========================================

async function registrarTentativa(participante) {

    const novo = push(ref(db(), "tentativas"));

    await set(novo, {

        nome: participante.nome,

        cpf: participante.cpf,

        telefone: participante.telefone,

        ganhou: false,

        data: serverTimestamp()

    });

}
