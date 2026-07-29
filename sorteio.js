// ===========================================
// SORTEIO
// ===========================================

import {

    carregarPremios,
    salvarVencedor,
    registrarTentativa,
    incrementarParticipantes,
    incrementarVencedores

} from "./firebase-raspadinha.js";

// ===========================================

let premios = [];

// ===========================================

export async function realizarSorteio(participante){

    await carregar();

    await incrementarParticipantes();

    const premio = escolherPremio();

    if(!premio){

        await registrarTentativa({

            participante,

            ganhou:false,

            data:new Date().toISOString()

        });

        return {

            ganhou:false,

            titulo:"Não foi dessa vez",

            imagem:"img/perdeu.png"

        };

    }

    premio.quantidade--;

    await salvarVencedor({

        participante,

        premio:premio.nome,

        data:new Date().toISOString()

    });

    await incrementarVencedores();

    await registrarTentativa({

        participante,

        ganhou:true,

        premio:premio.nome,

        data:new Date().toISOString()

    });

    return {

        ganhou:true,

        titulo:premio.nome,

        imagem:premio.imagem

    };

}

// ===========================================

async function carregar(){

    premios = await carregarPremios();

}

// ===========================================

function escolherPremio(){

    const disponiveis = premios.filter(p=>p.quantidade>0);

    if(disponiveis.length===0){

        return null;

    }

    const indice = Math.floor(

        Math.random()*disponiveis.length

    );

    return disponiveis[indice];

}
