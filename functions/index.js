const { onCall } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const { getDatabase } = require("firebase-admin/database");

initializeApp();

exports.participar = onCall(async (request) => {

    const db = getDatabase();

    const { nome, telefone } = request.data;

    if (!nome || !telefone) {
        throw new Error("Dados inválidos.");
    }

    // Verifica telefone já cadastrado
    const participantesRef = db.ref("participantes");

    const snap = await participantesRef
        .orderByChild("telefone")
        .equalTo(telefone)
        .get();

    if (snap.exists()) {
        return {
            sucesso: false,
            mensagem: "Este telefone já participou."
        };
    }

    // Contador
    const contadorRef = db.ref("contador");

    const contadorSnap = await contadorRef.get();

    let total = contadorSnap.val() || 0;

    if (total >= 1000) {
        return {
            sucesso: false,
            mensagem: "Promoção encerrada."
        };
    }

    total++;

    await contadorRef.set(total);

    // Resultado padrão
    let premio = "";

    // Lê vencedores atuais
    const vencedoresRef = db.ref("vencedores");

    const vencedoresSnap = await vencedoresRef.get();

    const vencedores = vencedoresSnap.val() || {};

    // Exemplo simples de distribuição.
    // Você pode trocar essa regra por outra posteriormente.
    if (!vencedores.ferro && total === 237) {

        premio = "FERRO";

    } else if (!vencedores.liquidificador && total === 814) {

        premio = "LIQUIDIFICADOR";

    }

    const participante = {
        nome,
        telefone,
        numero: total,
        premio,
        data: new Date().toISOString()
    };

    const novo = participantesRef.push();

    await novo.set(participante);

    if (premio === "FERRO") {

        await vencedoresRef.child("ferro").set(participante);

    }

    if (premio === "LIQUIDIFICADOR") {

        await vencedoresRef.child("liquidificador").set(participante);

    }

    return {
        sucesso: true,
        premio
    };

});
