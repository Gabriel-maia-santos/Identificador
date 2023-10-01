// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB3PNmu3hZZIdFvMZZHjHTUJ0LtM6f6usE",
    authDomain: "identificacao-fd475.firebaseapp.com",
    databaseURL: "https://identificacao-fd475-default-rtdb.firebaseio.com",
    projectId: "identificacao-fd475",
    storageBucket: "identificacao-fd475.appspot.com",
    messagingSenderId: "59193702828",
    appId: "1:59193702828:web:cc84e7d1d30bdeb900a209",
    measurementId: "G-NVWJ2SDSNT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };