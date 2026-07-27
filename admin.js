// ==========================================
// ADMIN.JS
// GilFest - Painel Administrativo
// ==========================================

// Firebase
const db = firebase.database();

// Referências
const contadorRef = db.ref("contador");
const premiosRef = db.ref("premios");
const campanhaRef = db.ref("campanha");
const participantesRef = db.ref("participantes");

// ==========================================
// TOTAL DE PARTICIPANTES
// ==========================================

contadorRef.on("value", (snapshot) => {

    const total = document.getElementById("total");

    if (!snapshot.exists()) {

        total.innerHTML = "0";

        return;

    }

    const dados = snapshot.val();

    total.innerHTML = dados.total || 0;

});

// ==========================================
// STATUS DA CAMPANHA
// ==========================================

campanhaRef.on("value", (snapshot) => {

    const status = document.getElementById("statusCampanha");

    if (!status) return;

    if (!snapshot.exists()) {

        status.innerHTML = "❌ Não criada";

        return;

    }

    const campanha = snapshot.val();

    status.innerHTML = campanha.ativa

        ? "🟢 Campanha Ativa"

        : "🔴 Campanha Encerrada";

});

// ==========================================
// PRÊMIOS
// ==========================================

premiosRef.on("value", (snapshot) => {

    if (!snapshot.exists()) return;

    const premios = snapshot.val();

    document.getElementById("ferro").innerHTML =

        premios.ferro?.disponivel

            ? "🟢 Disponível"

            : "🔴 Entregue";

    document.getElementById("liquidificador").innerHTML =

        premios.liquidificador?.disponivel

            ? "🟢 Disponível"

            : "🔴 Entregue";

    atualizarTabelaVencedores(premios);

});

// ==========================================
// TABELA DOS VENCEDORES
// ==========================================

function atualizarTabelaVencedores(premios){

    const lista = document.getElementById("lista");

    lista.innerHTML = "";

    if (premios.ferro && !premios.ferro.disponivel){

        lista.innerHTML += `

        <tr>

            <td>🔥 Ferro Elétrico</td>

            <td>${premios.ferro.vencedor || "-"}</td>

            <td>${premios.ferro.data || "-"}</td>

        </tr>

        `;

    }

    if (premios.liquidificador && !premios.liquidificador.disponivel){

        lista.innerHTML += `

        <tr>

            <td>🥤 Liquidificador</td>

            <td>${premios.liquidificador.vencedor || "-"}</td>

            <td>${premios.liquidificador.data || "-"}</td>

        </tr>

        `;

    }

}

// ==========================================
// NOVA CAMPANHA
// ==========================================

const btnNova = document.getElementById("novaCampanha");

if(btnNova){

btnNova.onclick = async ()=>{

    if(!confirm("Criar uma nova campanha?")) return;

    await campanhaRef.set({

        ativa:true,

        participantesMaximos:1000,

        criadaEm:Date.now()

    });

    alert("✅ Nova campanha criada.");

};

}

// ==========================================
// ENCERRAR
// ==========================================

const btnEncerrar = document.getElementById("encerrarCampanha");

if(btnEncerrar){

btnEncerrar.onclick = async ()=>{

    if(!confirm("Encerrar campanha?")) return;

    await campanhaRef.update({

        ativa:false

    });

    alert("Campanha encerrada.");

};

}

// ==========================================
// REINICIAR PROMOÇÃO
// ==========================================

async function reiniciar(){

    const confirmar = confirm(

        "Deseja realmente apagar todos os participantes?"

    );

    if(!confirmar) return;

    await campanhaRef.set({

        ativa:true,

        participantesMaximos:1000,

        criadaEm:Date.now()

    });

    await contadorRef.set({

        total:0

    });

    await participantesRef.remove();

    await premiosRef.set({

        ferro:{

            disponivel:true,

            vencedor:"",

            data:""

        },

        liquidificador:{

            disponivel:true,

            vencedor:"",

            data:""

        }

    });

    alert("✅ Promoção reiniciada.");

    location.reload();

}

// ==========================================
// EXPORTAR CSV
// ==========================================

const btnExportar = document.getElementById("exportar");

if(btnExportar){

btnExportar.onclick = async ()=>{

    const snap = await participantesRef.once("value");

    if(!snap.exists()){

        alert("Nenhum participante.");

        return;

    }

    const dados = snap.val();

    let csv =

"Nome;Telefone;Número;Prêmio;Data\n";

    Object.keys(dados).forEach(id=>{

        const p = dados[id];

        csv +=

`${p.nome || ""};${p.telefone || ""};${p.numero || ""};${p.premio || ""};${p.data || ""}\n`;

    });

    const blob = new Blob(

        [csv],

        {

            type:"text/csv;charset=utf-8;"

        }

    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "participantes.csv";

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

};

}

// ==========================================
// LOG
// ==========================================

console.log("Painel Administrativo carregado com sucesso.");
