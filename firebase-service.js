/* ==========================================
   FIREBASE SERVICE
   GilFest - Raspadinha v2.0
========================================== */

const db = firebase.database();

// Referências
const campanhaRef = db.ref("campanha");
const participantesRef = db.ref("participantes");
const vencedoresRef = db.ref("vencedores");
const contadorRef = db.ref("contador");

// ==========================================
// REGISTRAR PARTICIPANTE
// ==========================================

async function registrarParticipante(dados){

    return participantesRef.push(dados);

}

// ==========================================
// VERIFICAR TELEFONE
// ==========================================

async function telefoneJaExiste(telefone){

    const snap = await participantesRef
    .orderByChild("telefone")
    .equalTo(telefone)
    .once("value");

    return snap.exists();

}

// ==========================================
// CONTADOR
// ==========================================

async function incrementarContador(){

    return contadorRef.transaction(valor=>{

        return (valor || 0)+1;

    });

}

// ==========================================
// TOTAL DE PARTICIPANTES
// ==========================================

async function totalParticipantes(){

    const snap = await contadorRef.once("value");

    return snap.val() || 0;

}

// ==========================================
// CAMPANHA
// ==========================================

async function campanhaAtiva(){

    const snap = await campanhaRef.once("value");

    if(!snap.exists()) return false;

    return snap.val().ativa===true;

}

// ==========================================
// OBTER VENCEDORES
// ==========================================

async function obterVencedores(){

    const snap = await vencedoresRef.once("value");

    return snap.val() || {};

}

// ==========================================
// SALVAR VENCEDOR
// ==========================================

async function salvarVencedor(tipo,dados){

    return vencedoresRef
    .child(tipo)
    .set(dados);

}

// ==========================================
// DATA BRASILEIRA
// ==========================================

function dataBrasil(){

    const agora=new Date();

    return agora.toLocaleString("pt-BR");

}
