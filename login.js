/* ==========================================
   LOGIN.JS
   GilFest - Painel Administrativo
========================================== */

"use strict";

// Senha do administrador
const SENHA = "GilFest2026";

// Se já estiver logado, entra direto
if (localStorage.getItem("admin") === "ok") {

    location.replace("admin.html");

}

const campoSenha = document.getElementById("senha");
const erro = document.getElementById("erro");

// Entrar
function entrar() {

    const senha = campoSenha.value.trim();

    if (senha === SENHA) {

        localStorage.setItem("admin", "ok");

        location.replace("admin.html");

    } else {

        erro.textContent = "Senha incorreta.";

        campoSenha.value = "";

        campoSenha.focus();

    }

}

// Enter
campoSenha.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {

        entrar();

    }

});

// Limpar erro
campoSenha.addEventListener("input", function () {

    erro.textContent = "";

});
