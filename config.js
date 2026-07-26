// ==========================================
// CONFIGURAÇÕES DA RASPADINHA
// ==========================================

const CONFIG = {

    // Quantidade total de participantes
    totalParticipantes: 1000,

    // Quantidade máxima de vencedores
    maxVencedores: 2,

    // Prêmios
    premios: [

        {
            id: 1,
            nome: "FERRO ELÉTRICO",
            imagem: "img/ferro.png",
            quantidade: 1
        },

        {
            id: 2,
            nome: "LIQUIDIFICADOR",
            imagem: "img/liquidificador.png",
            quantidade: 1
        }

    ],

    // Mensagem para quem não ganhar
    perdeu: {
        nome: "NÃO FOI DESSA VEZ",
        imagem: ""
    }

};


// ==========================================
// CONTROLE LOCAL
// (Depois será substituído pelo Firebase)
// ==========================================

let ESTADO = {

    participantes: 0,

    vencedores: {

        ferro: 0,

        liquidificador: 0

    }

};


// ==========================================
// SORTEAR RESULTADO
// ==========================================

function sortearPremio(){

    ESTADO.participantes++;

    // Depois dos 1000 participantes,
    // ninguém mais participa.

    if(ESTADO.participantes > CONFIG.totalParticipantes){

        return CONFIG.perdeu;

    }

    // Escolhe dois números aleatórios
    // diferentes entre 1 e 1000

    if(!window.numeroFerro){

        window.numeroFerro =
        Math.floor(Math.random()*1000)+1;

        do{

            window.numeroLiquidificador =
            Math.floor(Math.random()*1000)+1;

        }while(window.numeroLiquidificador===window.numeroFerro);

    }

    // Ganhou o ferro

    if(
        ESTADO.participantes===window.numeroFerro &&
        ESTADO.vencedores.ferro===0
    ){

        ESTADO.vencedores.ferro++;

        return CONFIG.premios[0];

    }

    // Ganhou o liquidificador

    if(
        ESTADO.participantes===window.numeroLiquidificador &&
        ESTADO.vencedores.liquidificador===0
    ){

        ESTADO.vencedores.liquidificador++;

        return CONFIG.premios[1];

    }

    // Não ganhou

    return CONFIG.perdeu;

}
