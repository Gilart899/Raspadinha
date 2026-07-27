/* ==========================================
   EFFECTS.JS
   GilFest - Raspadinha Premiada
   ========================================== */

"use strict";

// ==========================================
// TREVOS
// ==========================================

function iniciarTrevos() {

    const container = document.getElementById("trevos");

    if (!container) return;

    setInterval(() => {

        const trevo = document.createElement("div");

        trevo.className = "trevo";

        trevo.style.left = Math.random() * 100 + "vw";

        trevo.style.animationDuration =
            (5 + Math.random() * 5) + "s";

        trevo.style.width =
            (18 + Math.random() * 22) + "px";

        trevo.style.height = trevo.style.width;

        trevo.style.opacity =
            0.4 + Math.random() * 0.6;

        container.appendChild(trevo);

        setTimeout(() => {

            trevo.remove();

        }, 10000);

    }, 350);

}

// ==========================================
// PARTÍCULAS DE BRILHO
// ==========================================

function iniciarParticulas() {

    const container = document.getElementById("particulas");

    if (!container) return;

    setInterval(() => {

        const p = document.createElement("div");

        p.className = "particula";

        p.style.left = Math.random() * 100 + "vw";

        p.style.animationDuration =
            (3 + Math.random() * 4) + "s";

        p.style.opacity =
            Math.random();

        container.appendChild(p);

        setTimeout(() => {

            p.remove();

        }, 7000);

    }, 250);

}

// ==========================================
// CONFETES
// ==========================================

function mostrarConfetes() {

    const area = document.getElementById("confetes");

    if (!area) return;

    for (let i = 0; i < 180; i++) {

        const c = document.createElement("div");

        c.style.position = "absolute";

        c.style.left = Math.random() * 100 + "vw";

        c.style.top = "-30px";

        c.style.width = "8px";

        c.style.height = "14px";

        c.style.borderRadius = "2px";

        c.style.pointerEvents = "none";

        c.style.background =
            `hsl(${Math.random()*360},100%,50%)`;

        area.appendChild(c);

        const x = (Math.random()*400)-200;

        const y = 900 + Math.random()*300;

        const r = Math.random()*1080;

        c.animate([

            {

                transform:
                "translate(0,0) rotate(0deg)",

                opacity:1

            },

            {

                transform:
                `translate(${x}px,${y}px) rotate(${r}deg)`,

                opacity:0

            }

        ],{

            duration:3500,

            easing:"ease-out"

        });

        setTimeout(()=>{

            c.remove();

        },3600);

    }

}

// ==========================================
// EXPLOSÃO DE ESTRELAS
// ==========================================

function explosao(x,y){

    for(let i=0;i<35;i++){

        const estrela=document.createElement("div");

        estrela.style.position="fixed";

        estrela.style.left=x+"px";

        estrela.style.top=y+"px";

        estrela.style.width="6px";

        estrela.style.height="6px";

        estrela.style.borderRadius="50%";

        estrela.style.background="#FFD700";

        estrela.style.pointerEvents="none";

        document.body.appendChild(estrela);

        const dx=(Math.random()*250)-125;

        const dy=(Math.random()*250)-125;

        estrela.animate([

            {

                transform:"translate(0,0)",

                opacity:1

            },

            {

                transform:
                `translate(${dx}px,${dy}px)`,

                opacity:0

            }

        ],{

            duration:900,

            easing:"ease-out"

        });

        setTimeout(()=>{

            estrela.remove();

        },900);

    }

}

// ==========================================
// BRILHO NO BOTÃO
// ==========================================

function brilhoBotao(){

    const botao=document.getElementById("btnParticipar");

    if(!botao) return;

    setInterval(()=>{

        botao.animate([

            {

                transform:"scale(1)"

            },

            {

                transform:"scale(1.06)"

            },

            {

                transform:"scale(1)"

            }

        ],{

            duration:900

        });

    },4000);

}

// ==========================================
// VIBRAÇÃO
// ==========================================

function vibrar(){

    if(

        navigator.vibrate &&

        CONFIG.efeitos.vibracao

    ){

        navigator.vibrate([150,80,150]);

    }

}

// ==========================================
// INICIAR EFEITOS
// ==========================================

function iniciarEffects(){

    if(CONFIG.efeitos.trevos){

        iniciarTrevos();

    }

    if(CONFIG.efeitos.particulas){

        iniciarParticulas();

    }

    brilhoBotao();

}

// ==========================================
// AUTO START
// ==========================================

window.addEventListener(

    "load",

    iniciarEffects

);

console.log("Effects.js carregado.");
