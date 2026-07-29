// ===========================================
// FIREBASE SERVICE
// Todas as operações do Realtime Database
// ===========================================

import { getDB } from "./firebase.js";

import {

    ref,
    get,
    set,
    push,
    update,
    remove,
    query,
    orderByChild,
    equalTo,
    runTransaction

} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

// ===========================================

const db = () => getDB();

// ===========================================
// LEITURA
// ===========================================

export async function ler(caminho) {

    const snapshot = await get(ref(db(), caminho));

    return snapshot.exists()
        ? snapshot.val()
        : null;

}

// ===========================================
// SALVAR
// ===========================================

export async function salvar(caminho, dados) {

    await set(ref(db(), caminho), dados);

}

// ===========================================
// ATUALIZAR
// ===========================================

export async function atualizar(caminho, dados) {

    await update(ref(db(), caminho), dados);

}

// ===========================================
// REMOVER
// ===========================================

export async function excluir(caminho) {

    await remove(ref(db(), caminho));

}

// ===========================================
// ADICIONAR
// ===========================================

export async function adicionar(caminho, dados) {

    const novo = push(ref(db(), caminho));

    await set(novo, dados);

    return novo.key;

}

// ===========================================
// TRANSACTION
// ===========================================

export async function incrementar(caminho) {

    const referencia = ref(db(), caminho);

    const resultado = await runTransaction(referencia, (valor) => {

        return (valor || 0) + 1;

    });

    return resultado.snapshot.val();

}

// ===========================================
// BUSCAR POR CAMPO
// ===========================================

export async function buscar(caminho, campo, valor) {

    const consulta = query(

        ref(db(), caminho),

        orderByChild(campo),

        equalTo(valor)

    );

    const snapshot = await get(consulta);

    return snapshot.exists()
        ? snapshot.val()
        : null;

}
