// ============================
// APP PRINCIPAL
// ============================

import { iniciarFirebase } from "./firebase.js";
import { carregarPremios } from "./premios.js";
import { iniciarParticipantes } from "./participantes.js";
import { iniciarRaspadinha } from "./raspadinha.js";
import { iniciarModal } from "./modal-premio.js";
import { iniciarEfeitos } from "./effects.js";
import { iniciarSons } from "./sounds.js";

// ============================

window.addEventListener("DOMContentLoaded", iniciarAplicacao);

// ============================

async function iniciarAplicacao() {

    mostrarLoading(true);

    try {

        // Firebase
        await iniciarFirebase();

        // Prêmios
        await carregarPremios();

        // Participantes
        iniciarParticipantes();

        // Sons
        iniciarSons();

        // Efeitos
        iniciarEfeitos();

        // Modal
        iniciarModal();

        // Canvas
        iniciarRaspadinha();

        console.log("✅ Aplicação iniciada.");

    } catch (erro) {

        console.error(erro);

        alert("Erro ao iniciar o sistema.");

    } finally {

        mostrarLoading(false);

    }

}

// ============================

function mostrarLoading(exibir) {

    const loading = document.getElementById("loading");

    loading.style.display = exibir
        ? "flex"
        : "none";

}
