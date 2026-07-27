/* ==========================================
   RASPADINHA.JS
   GilFest - Raspadinha Premiada
========================================== */

"use strict";

// Canvas
const canvas = document.getElementById("raspadinha");

const ctx = canvas.getContext("2d", {
    willReadFrequently: true
});

// Tamanho
canvas.width = CONFIG.raspadinha.largura;
canvas.height = CONFIG.raspadinha.altura;

// Estado
let raspando = false;
let premioAtual = null;
let porcentagem = 0;
let premioRevelado = false;

// Cobertura prateada
function desenharCobertura(){

    ctx.globalCompositeOperation = "source-over";

    ctx.fillStyle = "#C0C0C0";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    // Brilho

    const gradiente =
    ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
    );

    gradiente.addColorStop(0,"rgba(255,255,255,.5)");
    gradiente.addColorStop(.5,"rgba(180,180,180,.2)");
    gradiente.addColorStop(1,"rgba(255,255,255,.5)");

    ctx.fillStyle = gradiente;

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

}

// Inicia cobertura
desenharCobertura();
