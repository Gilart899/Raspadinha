/* ==========================================
   RIFA + RASPADINHA
========================================== */

"use strict";

// Número recebido da rifa
let numeroAtual = null;

// Carrega o número pela URL
const params = new URLSearchParams(window.location.search);

numeroAtual = params.get("numero");

// Se não existir número, volta para a rifa
if (!numeroAtual) {

    alert("Número da rifa não informado.");

    location.href = "cartela.html";

}

// Referência no Firebase
const numeroRef = db.ref("numeros/" + numeroAtual);

// Verifica se pode raspar
async function verificarPermissao() {

    const snap = await numeroRef.once("value");

    if (!snap.exists()) {

        alert("Número não encontrado.");

        location.href = "cartela.html";

        return false;

    }

    const dados = snap.val();

    if (!dados.pago) {

        alert("Pagamento ainda não confirmado.");

        location.href = "cartela.html";

        return false;

    }

    if (dados.raspou) {

        alert("Este número já utilizou a raspadinha.");

        location.href = "cartela.html";

        return false;

    }

    return true;

}

// Marca como utilizada
async function marcarComoRaspou() {

    await numeroRef.update({

        raspou: true,

        dataRaspagem: Date.now()

    });

}
