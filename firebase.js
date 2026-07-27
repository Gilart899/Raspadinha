// ==========================================
// FIREBASE.JS
// Raspadinha Premiada
// GilFest
// ==========================================

// Configuração Firebase

const firebaseConfig = {

    apiKey: "AIzaSyD5i67dD0UvvYTBC-Fp7Anl6naZvBtFD6E",

    authDomain: "raspadinha-b8271.firebaseapp.com",

    databaseURL: "https://raspadinha-b8271-default-rtdb.firebaseio.com",

    projectId: "raspadinha-b8271",

    storageBucket: "raspadinha-b8271.firebasestorage.app",

    messagingSenderId: "304013313818",

    appId: "1:304013313818:web:81845a74d20ccc62770ea3"

};

// Inicializa apenas uma vez

if (!firebase.apps.length) {

    firebase.initializeApp(firebaseConfig);

}

// Banco de dados

const db = firebase.database();

// Referências principais

const participantesRef = db.ref("participantes");

const premiosRef = db.ref("premios");

const campanhaRef = db.ref("campanha");

const contadorRef = db.ref("contador");

const vencedoresRef = db.ref("vencedores");

console.log("Firebase conectado com sucesso.");
