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

// ==========================================
// COBERTURA PRATEADA
// ==========================================

function desenharCobertura() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = "source-over";

    // Base prata
    ctx.fillStyle = "#BDBDBD";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Gradiente metálico
    const gradiente = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
    );

    gradiente.addColorStop(0, "#FFFFFF");
    gradiente.addColorStop(0.25, "#D8D8D8");
    gradiente.addColorStop(0.50, "#B0B0B0");
    gradiente.addColorStop(0.75, "#EAEAEA");
    gradiente.addColorStop(1, "#FFFFFF");

    ctx.fillStyle = gradiente;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Efeito de brilho
    for (let i = 0; i < 25; i++) {

        ctx.beginPath();

        ctx.fillStyle = "rgba(255,255,255,.10)";

        ctx.arc(

            Math.random() * canvas.width,

            Math.random() * canvas.height,

            Math.random() * 20 + 5,

            0,

            Math.PI * 2

        );

        ctx.fill();

    }

}

// ==========================================
// POSIÇÃO DO MOUSE / TOQUE
// ==========================================

function obterPosicao(evento) {

    const rect = canvas.getBoundingClientRect();

    if (evento.touches && evento.touches.length > 0) {

        return {

            x: evento.touches[0].clientX - rect.left,

            y: evento.touches[0].clientY - rect.top

        };

    }

    return {

        x: evento.clientX - rect.left,

        y: evento.clientY - rect.top

    };

}

// ==========================================
// RASPAR
// ==========================================

function raspar(evento) {

    if (!raspando) return;

    if (premioRevelado) return;

    evento.preventDefault();

    const pos = obterPosicao(evento);

    ctx.globalCompositeOperation = "destination-out";

    ctx.beginPath();

    ctx.arc(

        pos.x,

        pos.y,

        CONFIG.raspadinha.raio,

        0,

        Math.PI * 2

    );

    ctx.fill();

    verificarPorcentagem();

}
// ==========================================
// PORCENTAGEM RASPADA
// ==========================================

function verificarPorcentagem() {

    const pixels = ctx.getImageData(

        0,

        0,

        canvas.width,

        canvas.height

    ).data;

    let transparentes = 0;

    for (let i = 3; i < pixels.length; i += 4) {

        if (pixels[i] === 0) {

            transparentes++;

        }

    }

    porcentagem =

        transparentes /

        (canvas.width * canvas.height) *

        100;

    if (

        porcentagem >=

        CONFIG.raspadinha.porcentagemRevelar &&

        !premioRevelado

    ) {

        premioRevelado = true;

        revelarPremio();

    }

       }
// ==========================================
// EVENTOS DO CANVAS
// ==========================================

// Mouse
canvas.addEventListener("mousedown", () => {

    if (premioRevelado) return;

    raspando = true;

});

canvas.addEventListener("mousemove", raspar);

canvas.addEventListener("mouseup", () => {

    raspando = false;

});

canvas.addEventListener("mouseleave", () => {

    raspando = false;

});

// Touch
canvas.addEventListener("touchstart", (e) => {

    if (premioRevelado) return;

    raspando = true;

    raspar(e);

}, { passive:false });

canvas.addEventListener("touchmove", raspar, {

    passive:false

});

canvas.addEventListener("touchend", () => {

    raspando = false;

});

canvas.addEventListener("touchcancel", () => {

    raspando = false;

});
// ==========================================
// BLOQUEAR NOVA RASPAGEM
// ==========================================

async function bloquearNumero() {

    try {

        await numeroRef.update({

            raspou: true,

            dataRaspagem: Date.now(),

            porcentagem: Math.round(porcentagem)

        });

    } catch (erro) {

        console.error(

            "Erro ao bloquear número:",

            erro

        );

    }

}
// ==========================================
// NOVA RASPADINHA
// ==========================================

function novaRaspadinha() {

    raspando = false;

    premioAtual = null;

    premioRevelado = false;

    porcentagem = 0;

    desenharCobertura();

}

const btnNova =

document.getElementById("novaRaspadinha");

if (btnNova) {

    btnNova.addEventListener(

        "click",

        novaRaspadinha

    );

}
