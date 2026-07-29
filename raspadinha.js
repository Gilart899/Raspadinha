/* ==========================================
   RASPADINHA.JS
   GilFest - Raspadinha Premiada
   Versão 2.0
==========================================*/

"use strict";

// ==========================================
// VALIDAÇÕES
// ==========================================

if (typeof CONFIG === "undefined") {
    throw new Error("config.js não foi carregado.");
}

if (typeof firebase === "undefined") {
    throw new Error("firebase.js não foi carregado.");
}

const canvas = document.getElementById("raspadinha");

if (!canvas) {
    throw new Error("Canvas da raspadinha não encontrado.");
}

const ctx = canvas.getContext("2d", {
    willReadFrequently: true
});

canvas.width = CONFIG.raspadinha.largura;
canvas.height = CONFIG.raspadinha.altura;

// ==========================================
// FIREBASE
// ==========================================

const db = firebase.database();

const contadorRef = db.ref("contador");
const premiosRef = db.ref("premios");
const participantesRef = db.ref("participantes");
const numerosRef = db.ref("numeros");

// ==========================================
// NÚMERO DA RIFA
// ==========================================

const params = new URLSearchParams(window.location.search);

const numeroRifa = params.get("numero");

if (!numeroRifa) {

    alert("Número da rifa não informado.");

    location.href = "cartela.html";

}

const numeroRef = numerosRef.child(numeroRifa);

// ==========================================
// ESTADO
// ==========================================

let raspando = false;
let premioAtual = null;
let premioRevelado = false;
let porcentagem = 0;
let numeroAtual = null;
// ==========================================
// VERIFICAR NÚMERO
// ==========================================

async function verificarNumero() {

    const snap = await numeroRef.once("value");

    if (!snap.exists()) {

        alert("Número inexistente.");

        location.href = "cartela.html";

        return false;

    }

    numeroAtual = snap.val();

    if (!numeroAtual.pago) {

        alert("Pagamento ainda não confirmado.");

        location.href = "cartela.html";

        return false;

    }

    if (numeroAtual.raspou) {

        alert("Este número já utilizou a raspadinha.");

        location.href = "cartela.html";

        return false;

    }

    return true;

}

// ==========================================
// INICIAR
// ==========================================

(async () => {

    const permitido = await verificarNumero();

    if (!permitido) return;

    desenharCobertura();

})();
