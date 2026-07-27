/* ==========================================
   CONFIG.JS
   Raspadinha Premiada - GilFest
   Versão 2.0
========================================== */

const CONFIG = {

    // ======================================
    // CAMPANHA
    // ======================================

    campanha: "🍀 Raspadinha Premiada",

    empresa: "GilFest",

    ativa: true,

    // ======================================
    // PARTICIPANTES
    // ======================================

    totalParticipantes: 1000,

    maxVencedores: 2,

    // ======================================
    // PRÊMIOS
    // ======================================

    premios: {

        ferro: {

            id: 1,

            nome: "FERRO ELÉTRICO",

            imagem: "img/ferro.png",

            quantidade: 1

        },

        liquidificador: {

            id: 2,

            nome: "LIQUIDIFICADOR",

            imagem: "img/liquidificador.png",

            quantidade: 1

        }

    },

    // ======================================
    // MENSAGENS
    // ======================================

    ganhou: {

        titulo: "🎉 PARABÉNS!",

        texto: "Você foi contemplado!"

    },

    perdeu: {

        titulo: "🍀 NÃO FOI DESSA VEZ",

        texto: "Obrigado por participar!",

        imagem: ""

    },

    encerrada: {

        titulo: "❌ PROMOÇÃO ENCERRADA",

        texto: "Todas as participações já foram realizadas."

    },

    // ======================================
    // WHATSAPP
    // ======================================

    whatsapp: "5579999145044",

    mensagemWhatsapp:

        "🍀 Acabei de participar da Raspadinha Premiada! Venha participar também!",

    // ======================================
    // CORES
    // ======================================

    cores: {

        principal: "#00B050",

        secundaria: "#FFD700",

        fundo: "#0B8E36",

        texto: "#FFFFFF"

    },

    // ======================================
    // EFEITOS
    // ======================================

    efeitos: {

        trevos: true,

        confetes: true,

        particulas: true,

        vibracao: true,

        sons: true

    },

    // ======================================
    // RASPADINHA
    // ======================================

    raspadinha: {

        largura: 320,

        altura: 320,

        raio: 24,

        porcentagemRevelar: 70

    },

    // ======================================
    // FIREBASE
    // ======================================

    firebase: {

        participantes: "participantes",

        premios: "premios",

        campanha: "campanha",

        contador: "contador",

        vencedores: "vencedores"

    }

};

// Impede alterações acidentais
Object.freeze(CONFIG);

console.log("CONFIG.JS carregado com sucesso.");
