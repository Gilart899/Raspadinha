// Firebase SDK
const firebaseConfig = {
  apiKey: "AIzaSyD5i67dD0UvvYTBC-Fp7Anl6naZvBtFD6E",
  authDomain: "raspadinha-b8271.firebaseapp.com",
  databaseURL: "https://raspadinha-b8271-default-rtdb.firebaseio.com",
  projectId: "raspadinha-b8271",
  storageBucket: "raspadinha-b8271.firebasestorage.app",
  messagingSenderId: "304013313818",
  appId: "1:304013313818:web:81845a74d20ccc62770ea3"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.database();

// Referências
const participantesRef = db.ref("participantes");
const premiosRef = db.ref("premios");
