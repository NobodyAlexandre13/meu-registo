// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAm9Z3GLnrFnRo5XZIAaNXvj72YYjTJBZg",
    authDomain: "aponta-me.firebaseapp.com",
    databaseURL: "https://aponta-me-default-rtdb.firebaseio.com",
    projectId: "aponta-me",
    storageBucket: "aponta-me.firebasestorage.app",
    messagingSenderId: "492144111251",
    appId: "1:492144111251:web:381d3512999f9fecdf2766",
    measurementId: "G-MRQX6QLQCH"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);

// Obtendo a instância do Realtime Database
const database = getDatabase(app);

export { database };