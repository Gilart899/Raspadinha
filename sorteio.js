// ===============================
// SORTEIO OFICIAL
// ===============================

// Estes números devem ser gerados UMA ÚNICA VEZ
// e gravados no Firebase.

const NUMERO_FERRO = 237;
const NUMERO_LIQUIDIFICADOR = 814;

// ===============================

async function verificarPremio(numeroParticipante, idParticipante) {

    const premios = await lerPremios();

    // Ferro

    if (
        numeroParticipante === NUMERO_FERRO &&
        premios.ferro.disponivel
    ) {

        await entregarPremio("ferro", idParticipante);

        return {
            ganhou: true,
            nome: "FERRO ELÉTRICO",
            imagem: "img/ferro.png"
        };

    }

    // Liquidificador

    if (
        numeroParticipante === NUMERO_LIQUIDIFICADOR &&
        premios.liquidificador.disponivel
    ) {

        await entregarPremio("liquidificador", idParticipante);

        return {
            ganhou: true,
            nome: "LIQUIDIFICADOR",
            imagem: "img/liquidificador.png"
        };

    }

    return {

        ganhou: false,

        nome: "NÃO FOI DESSA VEZ",

        imagem: ""

    };

}
