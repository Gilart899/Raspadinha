const { onCall } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const { getDatabase } = require("firebase-admin/database");

initializeApp();

exports.criarCampanha = onCall(async () => {

    const db = getDatabase();

    function numeroAleatorio() {
        return Math.floor(Math.random() * 1000) + 1;
    }

    let ferro = numeroAleatorio();
    let liquidificador = numeroAleatorio();

    // Garante que os dois números sejam diferentes
    while (liquidificador === ferro) {
        liquidificador = numeroAleatorio();
    }

    await db.ref("campanha").set({

        ativa: true,

        participantesMaximos: 1000,

        premioFerro: {
            numero: ferro,
            entregue: false
        },

        premioLiquidificador: {
            numero: liquidificador,
            entregue: false
        },

        criadaEm: Date.now()

    });

    return {

        sucesso: true,

        mensagem: "Campanha criada com sucesso."

    };

});
