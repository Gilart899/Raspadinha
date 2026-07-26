// ================================
// ELEMENTOS
// ================================

const btn = document.getElementById("btnRaspar");
const janela = document.getElementById("janelaRaspadinha");
const fechar = document.getElementById("fechar");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const imgPremio = document.getElementById("imagemPremio");
const txtPremio = document.getElementById("textoPremio");

// ================================
// ABRIR
// ================================

btn.onclick = () => {

    janela.classList.remove("oculto");

    iniciarRaspadinha();

};

// ================================
// FECHAR
// ================================

fechar.onclick = () => {

    janela.classList.add("oculto");

};

// ================================
// INICIAR RASPADINHA
// ================================

function iniciarRaspadinha(){

    canvas.width = 320;
    canvas.height = 320;

    ctx.globalCompositeOperation = "source-over";

    ctx.fillStyle = "#BDBDBD";
    ctx.fillRect(0,0,320,320);

    ctx.fillStyle = "#666";

    ctx.font = "bold 28px Arial";

    ctx.textAlign = "center";

    ctx.fillText("RASPE AQUI",160,165);

    resultado = sortearPremio();

    txtPremio.innerHTML = resultado.nome;

    if(resultado.imagem!=""){

        imgPremio.style.display="block";

        imgPremio.src=resultado.imagem;

    }else{

        imgPremio.style.display="none";

    }

}

// ================================
// RASPAR
// ================================

let raspando=false;

canvas.addEventListener("mousedown",()=>{

    raspando=true;

});

canvas.addEventListener("mouseup",()=>{

    raspando=false;

});

canvas.addEventListener("mousemove",raspar);

canvas.addEventListener("touchstart",()=>{

    raspando=true;

});

canvas.addEventListener("touchend",()=>{

    raspando=false;

});

canvas.addEventListener("touchmove",raspar);

// ================================

function raspar(e){

    if(!raspando) return;

    e.preventDefault();

    let rect=canvas.getBoundingClientRect();

    let x,y;

    if(e.touches){

        x=e.touches[0].clientX-rect.left;

        y=e.touches[0].clientY-rect.top;

    }else{

        x=e.clientX-rect.left;

        y=e.clientY-rect.top;

    }

    ctx.globalCompositeOperation="destination-out";

    ctx.beginPath();

    ctx.arc(x,y,22,0,Math.PI*2);

    ctx.fill();

    verificarRaspagem();

}

// ================================
// VERIFICAR
// ================================

function verificarRaspagem(){

    let pixels=ctx.getImageData(0,0,320,320);

    let transparentes=0;

    for(let i=3;i<pixels.data.length;i+=4){

        if(pixels.data[i]==0){

            transparentes++;

        }

    }

    let porcentagem=(transparentes/(320*320))*100;

    if(porcentagem>60){

        revelarResultado();

    }

}

// ================================
// RESULTADO
// ================================

function revelarResultado(){

    ctx.clearRect(0,0,320,320);

    if(resultado.nome!="NÃO FOI DESSA VEZ"){

        confetes();

    }

}

// ================================
// TREVOS
// ================================

setInterval(()=>{

    let trevo=document.createElement("div");

    trevo.className="trevo";

    trevo.style.left=Math.random()*100+"vw";

    trevo.style.animationDuration=
    (4+Math.random()*6)+"s";

    document
    .getElementById("trevos")
    .appendChild(trevo);

    setTimeout(()=>{

        trevo.remove();

    },10000);

},400);

// ================================
// CONFETES
// ================================

function confetes(){

    let area=document.getElementById("confetes");

    for(let i=0;i<120;i++){

        let c=document.createElement("div");

        c.style.position="absolute";

        c.style.width="8px";

        c.style.height="12px";

        c.style.background=
        "hsl("+Math.random()*360+",100%,50%)";

        c.style.left=Math.random()*100+"vw";

        c.style.top="-20px";

        c.style.transition="4s linear";

        area.appendChild(c);

        setTimeout(()=>{

            c.style.top="110vh";

            c.style.transform=
            "rotate("+Math.random()*900+"deg)";

        },50);

        setTimeout(()=>{

            c.remove();

        },4500);

    }

}
