// ============================
// FIREBASE
// Inicialização única
// ============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import { getDatabase } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

// ============================
// CONFIGURAÇÃO
// ============================

const firebaseConfig = {

    apiKey: CONFIG.firebase.apiKey,

    authDomain: CONFIG.firebase.authDomain,

    databaseURL: CONFIG.firebase.databaseURL,

    projectId: CONFIG.firebase.projectId,

    storageBucket: CONFIG.firebase.storageBucket,

    messagingSenderId: CONFIG.firebase.messagingSenderId,

    appId: CONFIG.firebase.appId

};

// ============================

let app = null;

let database = null;

// ============================

export async function iniciarFirebase() {

    if (app) {

        return database;

    }

    app = initializeApp(firebaseConfig);

    database = getDatabase(app);

    console.log("✅ Firebase conectado.");

    return database;

}

// ============================

export function getDB() {

    return database;

}
