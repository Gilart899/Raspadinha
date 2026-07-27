// ===============================
// REFERÊNCIAS FIREBASE
// ===============================

const db = firebase.database();

const contadorRef = db.ref("contador");
const premiosRef = db.ref("premios");

// ===============================
// TOTAL DE PARTICIPANTES
// ===============================

contadorRef.on("value", (snapshot) => {

    if (!snapshot.exists()) {

        document.getElementById("total").innerHTML = "0";
        return;

    }

    const dados = snapshot.val();

    document.getElementById("total").innerHTML = dados.total || 0;

});

// ===============================
// PRÊMIOS
// ===============================

premiosRef.on("value", (snapshot) => {

    if (!snapshot.exists()) return;

    const premios = snapshot.val();

    // Ferro

    document.getElementById("ferro").innerHTML =
        premios.ferro.disponivel ?
        "🟢 Disponível" :
        "🔴 Entregue";

    // Liquidificador

    document.getElementById("liquidificador").innerHTML =
        premios.liquidificador.disponivel ?
        "🟢 Disponível" :
        "🔴 Entregue";

    // Lista de vencedores

    const lista = document.getElementById("lista");

    lista.innerHTML = "";

    if (!premios.ferro.disponivel) {

        lista.innerHTML += `
        <tr>
            <td>Ferro Elétrico</td>
            <td>${premios.ferro.vencedor}</td>
            <td>${premios.ferro.data}</td>
        </tr>
        `;

    }

    if (!premios.liquidificador.disponivel) {

        lista.innerHTML += `
        <tr>
            <td>Liquidificador</td>
            <td>${premios.liquidificador.vencedor}</td>
            <td>${premios.liquidificador.data}</td>
        </tr>
        `;

    }

});

// ===============================
// REINICIAR PROMOÇÃO
// ===============================

async function reiniciar() {

    const confirmar = confirm(
        "Tem certeza que deseja reiniciar a promoção?"
    );

    if (!confirmar) return;

    // Reinicia contador

    await contadorRef.set({

        total: 0

    });

    // Limpa participantes

    await db.ref("participantes").remove();

    // Reinicia prêmios

    await premiosRef.set({

        ferro: {

            disponivel: true

        },

        liquidificador: {

            disponivel: true

        }

    });

    alert("Promoção reiniciada com sucesso!");

}
