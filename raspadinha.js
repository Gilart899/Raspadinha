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

// ==========================================
// REVELAR PRÊMIO
// ==========================================

async function revelarPremio() {

    if (premioAtual !== null) return;

    try {

        // Bloqueia imediatamente este número
        await bloquearNumero();

        // Consulta o resultado
        const resultado = await sortearPremioFirebase();

        premioAtual = resultado;

        // Limpa a cobertura
        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        ctx.globalCompositeOperation = "source-over";

        // Fundo branco
        ctx.fillStyle = "#FFFFFF";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        // Desenha imagem
        if(resultado.imagem){

            await desenharImagem(resultado.imagem);

        }

        // Nome do prêmio
        desenharTexto(resultado.nome);

        // Resultado

        if(resultado.ganhou){

            vencedor(resultado);

        }else{

            perdedor();

        }

    }catch(erro){

        console.error(erro);

        alert(
            "Erro ao consultar o servidor."
        );

    }

}
// ==========================================
// DESENHAR IMAGEM
// ==========================================

function desenharImagem(src){

    return new Promise((resolve)=>{

        const img=new Image();

        img.onload=function(){

            ctx.drawImage(

                img,

                35,

                15,

                250,

                170

            );

            resolve();

        };

        img.onerror=resolve;

        img.src=src;

    });

}
// ==========================================
// DESENHAR TEXTO
// ==========================================

function desenharTexto(texto){

    ctx.fillStyle="#222";

    ctx.font="bold 22px Arial";

    ctx.textAlign="center";

    ctx.fillText(

        texto,

        canvas.width/2,

        225

    );

}
// ==========================================
// GANHOU
// ==========================================

function vencedor(resultado){

    if(typeof mostrarConfetes==="function"){

        mostrarConfetes();

    }

    if(typeof vibrar==="function"){

        vibrar();

    }

    if(typeof tocarSomVitoria==="function"){

        tocarSomVitoria();

    }

    abrirFormularioGanhador(resultado);

           }
// ==========================================
// PERDEU
// ==========================================

function perdedor(){

    if(typeof tocarSomPerdeu==="function"){

        tocarSomPerdeu();

    }

    alert(

        "Que pena! Não foi desta vez."

    );

}
// ==========================================
// SORTEIO VIA FIREBASE
// ==========================================

// ==========================================
// BUSCAR CONFIGURAÇÃO DA CAMPANHA
// ==========================================

async function carregarCampanha() {

    const snap = await db.ref("campanha").once("value");

    if (!snap.exists()) {

        throw new Error("Campanha não configurada.");

    }

    return snap.val();

}

// ==========================================
// SORTEIO VIA FIREBASE
// ==========================================

async function sortearPremioFirebase() {

    try {

        // Incrementa o contador usando transação
        const contador = await contadorRef.transaction((dados) => {

            if (dados === null) {

                return { total: 1 };

            }

            dados.total++;

            return dados;

        });

        const total = contador.snapshot.val().total;

        // Carrega campanha
        const campanha = await carregarCampanha();

        if (total > campanha.totalParticipantes) {

            return {

                ganhou: false,

                nome: CONFIG.perdeu.nome,

                imagem: CONFIG.perdeu.imagem

            };

        }

        // Prêmios
        const premiosSnap = await premiosRef.once("value");

        const premios = premiosSnap.val();

        // ============================
        // FERRO
        // ============================

        if (

            total === campanha.numeroFerro &&

            premios.ferro.disponivel

        ) {

            await premiosRef.child("ferro").update({

                disponivel: false,

                numeroRifa: numeroRifa,

                data: new Date().toLocaleString("pt-BR")

            });

            return {

                ganhou: true,

                nome: premios.ferro.nome,

                imagem: premios.ferro.imagem,

                premio: "ferro"

            };

        }

        // ============================
        // LIQUIDIFICADOR
        // ============================

        if (

            total === campanha.numeroLiquidificador &&

            premios.liquidificador.disponivel

        ) {

            await premiosRef.child("liquidificador").update({

                disponivel: false,

                numeroRifa: numeroRifa,

                data: new Date().toLocaleString("pt-BR")

            });

            return {

                ganhou: true,

                nome: premios.liquidificador.nome,

                imagem: premios.liquidificador.imagem,

                premio: "liquidificador"

            };

        }

        // Não ganhou

        return {

            ganhou: false,

            nome: CONFIG.perdeu.nome,

            imagem: CONFIG.perdeu.imagem

        };

    } catch (erro) {

        console.error(erro);

        return {

            ganhou: false,

            nome: "Erro",

            imagem: ""

        };

    }

                   }

            dados.total++;

            return dados;

        });

        const total = contador.snapshot.val().total;

        // Limite da campanha
        if (total > CONFIG.totalParticipantes) {

            return {

                ganhou: false,

                nome: CONFIG.perdeu.nome,

                imagem: CONFIG.perdeu.imagem

            };

        }

        // Carrega os prêmios
        const premiosSnap = await premiosRef.once("value");

        const premios = premiosSnap.val();

        if (!premios) {

            throw new Error("Prêmios não encontrados.");

        }

        // Números premiados
        const numeroFerro =
            CONFIG.premios.ferro.numero;

        const numeroLiquidificador =
            CONFIG.premios.liquidificador.numero;

        // ==================================
        // FERRO ELÉTRICO
        // ==================================

        if (

            total === numeroFerro &&

            premios.ferro.disponivel

        ) {

            await premiosRef.child("ferro").update({

                disponivel: false,

                numero: numeroRifa,

                data: new Date().toLocaleString("pt-BR")

            });

            return {

                ganhou: true,

                nome: CONFIG.premios.ferro.nome,

                imagem: CONFIG.premios.ferro.imagem,

                premio: "ferro"

            };

        }

        // ==================================
        // LIQUIDIFICADOR
        // ==================================

        if (

            total === numeroLiquidificador &&

            premios.liquidificador.disponivel

        ) {

            await premiosRef.child("liquidificador").update({

                disponivel: false,

                numero: numeroRifa,

                data: new Date().toLocaleString("pt-BR")

            });

            return {

                ganhou: true,

                nome: CONFIG.premios.liquidificador.nome,

                imagem: CONFIG.premios.liquidificador.imagem,

                premio: "liquidificador"

            };

        }

        // Não ganhou

        return {

            ganhou: false,

            nome: CONFIG.perdeu.nome,

            imagem: CONFIG.perdeu.imagem

        };

    }

    catch (erro) {

        console.error(erro);

        return {

            ganhou: false,

            nome: "Erro",

            imagem: ""

        };

    }

                   }
