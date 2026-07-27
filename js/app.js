/* ==========================================
   APP.JS
   Raspadinha Premiada v2.0
========================================== */

// ===============================
// ELEMENTOS
// ===============================

const btnParticipar = document.getElementById("btnParticipar");
const modal = document.getElementById("modal");
const btnFechar = document.getElementById("fechar");
const btnCompartilhar = document.getElementById("compartilhar");
const loading = document.getElementById("loading");

// ===============================
// LOADING
// ===============================

window.addEventListener("load", () => {

    setTimeout(() => {

        loading.style.display = "none";

    }, 1800);

});

// ===============================
// ABRIR RASPADINHA
// ===============================

btnParticipar.addEventListener("click", () => {

    modal.classList.remove("hidden");

    if (navigator.vibrate) {

        navigator.vibrate(80);

    }

    iniciarRaspadinha();

});

// ===============================
// FECHAR
// ===============================

btnFechar.addEventListener("click", () => {

    modal.classList.add("hidden");

});

// ===============================
// COMPARTILHAR
// ===============================

btnCompartilhar.addEventListener("click", async () => {

    const texto =
        "🍀 Estou participando da Raspadinha Premiada! Venha tentar sua sorte!";

    if (navigator.share) {

        try {

            await navigator.share({

                title: "Raspadinha Premiada",

                text: texto,

                url: window.location.href

            });

        } catch (e) {

            console.log(e);

        }

    } else {

        const link =

            "https://wa.me/?text=" +

            encodeURIComponent(texto + "\n" + window.location.href);

        window.open(link, "_blank");

    }

});

// ===============================
// TREVOS
// ===============================

setInterval(() => {

    const trevo = document.createElement("div");

    trevo.className = "trevo";

    trevo.style.left = Math.random() * 100 + "vw";

    trevo.style.animationDuration =

        (5 + Math.random() * 5) + "s";

    trevo.style.width =

        (20 + Math.random() * 25) + "px";

    trevo.style.height = trevo.style.width;

    document
        .getElementById("trevos")
        .appendChild(trevo);

    setTimeout(() => {

        trevo.remove();

    }, 12000);

}, 350);

// ===============================
// PARTÍCULAS
// ===============================

setInterval(() => {

    const p = document.createElement("div");

    p.className = "particula";

    p.style.left = Math.random() * 100 + "vw";

    p.style.animationDuration =

        (4 + Math.random() * 4) + "s";

    p.style.opacity = Math.random();

    document
        .getElementById("particulas")
        .appendChild(p);

    setTimeout(() => {

        p.remove();

    }, 8000);

}, 250);

// ===============================
// CONFETES
// ===============================

function mostrarConfetes() {

    const area = document.getElementById("confetes");

    for (let i = 0; i < 150; i++) {

        const c = document.createElement("div");

        c.style.position = "absolute";

        c.style.left = Math.random() * 100 + "vw";

        c.style.top = "-20px";

        c.style.width = "8px";

        c.style.height = "12px";

        c.style.background =

            `hsl(${Math.random() * 360},100%,50%)`;

        c.style.transition =

            (3 + Math.random()) + "s linear";

        area.appendChild(c);

        setTimeout(() => {

            c.style.top = "110vh";

            c.style.transform =

                `rotate(${Math.random() * 900}deg)`;

        }, 20);

        setTimeout(() => {

            c.remove();

        }, 5000);

    }

}

// ===============================
// VIBRAR AO GANHAR
// ===============================

function vibrarPremio() {

    if (navigator.vibrate) {

        navigator.vibrate([150, 100, 150, 100, 250]);

    }

}
