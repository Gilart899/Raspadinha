/* ==========================================
   LOGIN.JS
   GilFest - Painel Administrativo
========================================== */

"use strict";

// Se já estiver logado, entra direto
firebase.auth().onAuthStateChanged((user) => {

    if (user) {

        location.replace("admin.html");

    }

});

// Entrar
function entrar() {

    const email = document
        .getElementById("email")
        .value
        .trim();

    const senha = document
        .getElementById("senha")
        .value;

    const erro = document
        .getElementById("erro");

    erro.textContent = "";

    if (email === "" || senha === "") {

        erro.textContent = "Preencha o e-mail e a senha.";

        return;

    }

    firebase.auth()

        .signInWithEmailAndPassword(email, senha)

        .then(() => {

            location.replace("admin.html");

        })

        .catch((error) => {

            switch (error.code) {

                case "auth/invalid-email":
                    erro.textContent = "E-mail inválido.";
                    break;

                case "auth/user-not-found":
                    erro.textContent = "Usuário não encontrado.";
                    break;

                case "auth/wrong-password":
                case "auth/invalid-credential":
                    erro.textContent = "E-mail ou senha incorretos.";
                    break;

                case "auth/too-many-requests":
                    erro.textContent = "Muitas tentativas. Tente novamente mais tarde.";
                    break;

                default:
                    erro.textContent = error.message;

            }

        });

}

// Entrar pressionando ENTER
document.getElementById("senha")

.addEventListener("keydown", function(e){

    if(e.key==="Enter"){

        entrar();

    }

});

// Limpar erro ao digitar
document.getElementById("email")

.addEventListener("input",()=>{

    document.getElementById("erro").textContent="";

});

document.getElementById("senha")

.addEventListener("input",()=>{

    document.getElementById("erro").textContent="";

});

console.log("Login.js carregado.");
