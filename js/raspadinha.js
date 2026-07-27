/* ==========================================
   RASPADINHA.JS
   GilFest - Versão 2.0
========================================== */

// ==========================================
// ELEMENTOS
// ==========================================

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const imagemPremio =
document.getElementById("imagemPremio");

const textoPremio =
document.getElementById("textoPremio");

// ==========================================
// CONFIGURAÇÃO
// ==========================================

const LARGURA = 320;
const ALTURA = 320;

canvas.width = LARGURA;
canvas.height = ALTURA;

let raspando = false;

let resultadoAtual = null;

let revelado = false;

// ==========================================
// INICIAR
// ==========================================

async function iniciarRaspadinha(){

    revelado = false;

    resultadoAtual = null;

    ctx.globalCompositeOperation="source-over";

    desenharCamadaMetalica();

    try{

        resultadoAtual = await iniciarSorteioFirebase();

    }catch(e){

        console.error(e);

        resultadoAtual = {

            ganhou:false,

            nome:"NÃO FOI DESSA VEZ",

            imagem:""

        };

    }

    textoPremio.innerHTML =
    resultadoAtual.nome;

    if(resultadoAtual.imagem){

        imagemPremio.src =
        resultadoAtual.imagem;

        imagemPremio.style.display =
        "block";

    }else{

        imagemPremio.style.display =
        "none";

    }

}

// ==========================================
// CAMADA METÁLICA
// ==========================================

function desenharCamadaMetalica(){

    ctx.clearRect(0,0,LARGURA,ALTURA);

    const grad =
    ctx.createLinearGradient(
    0,
    0,
    LARGURA,
    ALTURA);

    grad.addColorStop(0,"#f5f5f5");
    grad.addColorStop(.25,"#d9d9d9");
    grad.addColorStop(.50,"#9d9d9d");
    grad.addColorStop(.75,"#ececec");
    grad.addColorStop(1,"#bfbfbf");

    ctx.fillStyle = grad;

    ctx.fillRect(
    0,
    0,
    LARGURA,
    ALTURA);

    for(let i=0;i<250;i++){

        ctx.fillStyle=
        `rgba(255,255,255,${
        Math.random()*0.20
        })`;

        ctx.fillRect(

        Math.random()*LARGURA,

        Math.random()*ALTURA,

        2,

        2

        );

    }

    ctx.fillStyle="rgba(0,0,0,.25)";

    ctx.font="bold 28px Arial";

    ctx.textAlign="center";

    ctx.fillText(

    "RASPE AQUI",

    LARGURA/2,

    ALTURA/2

    );

}

// ==========================================
// INICIAR RASPAGEM
// ==========================================

canvas.addEventListener(

"mousedown",

()=>{

raspando=true;

}

);

canvas.addEventListener(

"mouseup",

()=>{

raspando=false;

}

);

canvas.addEventListener(

"mouseleave",

()=>{

raspando=false;

}

);

canvas.addEventListener(

"touchstart",

()=>{

raspando=true;

}

);

canvas.addEventListener(

"touchend",

()=>{

raspando=false;

}

);

canvas.addEventListener(

"mousemove",

raspar

);

canvas.addEventListener(

"touchmove",

raspar,

{passive:false}

);
/* ==========================================
   RASPADINHA.JS
   GilFest - Versão 2.0
========================================== */

// ==========================================
// ELEMENTOS
// ==========================================

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const imagemPremio =
document.getElementById("imagemPremio");

const textoPremio =
document.getElementById("textoPremio");

// ==========================================
// CONFIGURAÇÃO
// ==========================================

const LARGURA = 320;
const ALTURA = 320;

canvas.width = LARGURA;
canvas.height = ALTURA;

let raspando = false;

let resultadoAtual = null;

let revelado = false;

// ==========================================
// INICIAR
// ==========================================

async function iniciarRaspadinha(){

    revelado = false;

    resultadoAtual = null;

    ctx.globalCompositeOperation="source-over";

    desenharCamadaMetalica();

    try{

        resultadoAtual = await iniciarSorteioFirebase();

    }catch(e){

        console.error(e);

        resultadoAtual = {

            ganhou:false,

            nome:"NÃO FOI DESSA VEZ",

            imagem:""

        };

    }

    textoPremio.innerHTML =
    resultadoAtual.nome;

    if(resultadoAtual.imagem){

        imagemPremio.src =
        resultadoAtual.imagem;

        imagemPremio.style.display =
        "block";

    }else{

        imagemPremio.style.display =
        "none";

    }

}

// ==========================================
// CAMADA METÁLICA
// ==========================================

function desenharCamadaMetalica(){

    ctx.clearRect(0,0,LARGURA,ALTURA);

    const grad =
    ctx.createLinearGradient(
    0,
    0,
    LARGURA,
    ALTURA);

    grad.addColorStop(0,"#f5f5f5");
    grad.addColorStop(.25,"#d9d9d9");
    grad.addColorStop(.50,"#9d9d9d");
    grad.addColorStop(.75,"#ececec");
    grad.addColorStop(1,"#bfbfbf");

    ctx.fillStyle = grad;

    ctx.fillRect(
    0,
    0,
    LARGURA,
    ALTURA);

    for(let i=0;i<250;i++){

        ctx.fillStyle=
        `rgba(255,255,255,${
        Math.random()*0.20
        })`;

        ctx.fillRect(

        Math.random()*LARGURA,

        Math.random()*ALTURA,

        2,

        2

        );

    }

    ctx.fillStyle="rgba(0,0,0,.25)";

    ctx.font="bold 28px Arial";

    ctx.textAlign="center";

    ctx.fillText(

    "RASPE AQUI",

    LARGURA/2,

    ALTURA/2

    );

}

// ==========================================
// INICIAR RASPAGEM
// ==========================================

canvas.addEventListener(

"mousedown",

()=>{

raspando=true;

}

);

canvas.addEventListener(

"mouseup",

()=>{

raspando=false;

}

);

canvas.addEventListener(

"mouseleave",

()=>{

raspando=false;

}

);

canvas.addEventListener(

"touchstart",

()=>{

raspando=true;

}

);

canvas.addEventListener(

"touchend",

()=>{

raspando=false;

}

);

canvas.addEventListener(

"mousemove",

raspar

);

canvas.addEventListener(

"touchmove",

raspar,

{passive:false}

);
