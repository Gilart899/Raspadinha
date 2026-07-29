// =========================================
// RASPADINHA
// Canvas + Eventos
// =========================================

import { revelarPremio } from "./modal-premio.js";
import { realizarSorteio } from "./sorteio.js";
import { tocarRaspando } from "./sounds.js";

let canvas;
let ctx;

let raspando = false;

let largura;
let altura;

const PORCENTAGEM = 70;

export function iniciarRaspadinha() {

    canvas = document.getElementById("canvas");

    ctx = canvas.getContext("2d", {
        willReadFrequently: true
    });

    redimensionar();

    window.addEventListener("resize", redimensionar);

    iniciarEventos();

}

function redimensionar() {

    largura = canvas.offsetWidth;

    altura = canvas.offsetHeight;

    canvas.width = largura;

    canvas.height = altura;

    desenharMascara();

}

function desenharMascara() {

    ctx.globalCompositeOperation = "source-over";

    ctx.fillStyle = "#C0C0C0";

    ctx.fillRect(0, 0, largura, altura);

    ctx.fillStyle = "#9e9e9e";

    for (let i = 0; i < 250; i++) {

        ctx.beginPath();

        ctx.arc(

            Math.random() * largura,

            Math.random() * altura,

            Math.random() * 3,

            0,

            Math.PI * 2

        );

        ctx.fill();

    }

}

function iniciarEventos() {

    canvas.addEventListener("mousedown", iniciarMouse);

    canvas.addEventListener("mousemove", moverMouse);

    window.addEventListener("mouseup", parar);

    canvas.addEventListener("touchstart", iniciarTouch,{passive:false});

    canvas.addEventListener("touchmove", moverTouch,{passive:false});

    window.addEventListener("touchend", parar);

}

function iniciarMouse() {

    raspando = true;

}

function moverMouse(e) {

    if (!raspando) return;

    raspar(e.offsetX,e.offsetY);

}

function iniciarTouch(e) {

    e.preventDefault();

    raspando = true;

}

function moverTouch(e) {

    e.preventDefault();

    if (!raspando) return;

    const rect = canvas.getBoundingClientRect();

    const toque = e.touches[0];

    raspar(

        toque.clientX - rect.left,

        toque.clientY - rect.top

    );

}

function parar() {

    raspando = false;

}

function raspar(x,y){

    tocarRaspando();

    ctx.globalCompositeOperation="destination-out";

    ctx.beginPath();

    ctx.arc(x,y,22,0,Math.PI*2);

    ctx.fill();

    verificarPorcentagem();

}

function verificarPorcentagem(){

    const pixels=ctx.getImageData(

        0,

        0,

        largura,

        altura

    ).data;

    let apagados=0;

    for(let i=3;i<pixels.length;i+=4){

        if(pixels[i]===0){

            apagados++;

        }

    }

    const total=pixels.length/4;

    const porcentagem=(apagados/total)*100;

    if(porcentagem>=PORCENTAGEM){

        finalizar();

    }

}

let finalizado=false;

async function finalizar(){

    if(finalizado) return;

    finalizado=true;

    const premio=await realizarSorteio();

    revelarPremio(premio);

}
