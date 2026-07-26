// ===============================
// REFERÊNCIAS
// ===============================

const contadorRef = firebase.database().ref("contador");
const participantesRef = firebase.database().ref("participantes");
const premiosRef = firebase.database().ref("premios");

// ===============================
// OBTER CONTADOR
// ===============================

async function obterContador() {

    const snap = await contadorRef.once("value");

    if (!snap.exists()) {

        await contadorRef.set({
            total: 0
        });

        return 0;
    }

    return snap.val().total || 0;
}

// ===============================
// INCREMENTAR CONTADOR
// ===============================

async function incrementarParticipante() {

    const total = await obterContador();

    const novoTotal = total + 1;

    await contadorRef.set({
        total: novoTotal
    });

    return novoTotal;
}

// ===============================
// REGISTRAR PARTICIPANTE
// ===============================

async function registrarParticipante(id) {

    await participantesRef.child(id).set({

        participou: true,

        data: new Date().toISOString()

    });

}

// ===============================
// VERIFICAR PARTICIPAÇÃO
// ===============================

async function jaParticipou(id) {

    const snap = await participantesRef.child(id).once("value");

    return snap.exists();

}

// ===============================
// LER PRÊMIOS
// ===============================

async function lerPremios() {

    const snap = await premiosRef.once("value");

    return snap.val();

}

// ===============================
// ENTREGAR PRÊMIO
// ===============================

async function entregarPremio(nome,id){

    await premiosRef.child(nome).update({

        disponivel:false,

        vencedor:id,

        data:new Date().toISOString()

    });

}
