// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDHaQodYotsBaJcyMeHKerrImvTRZflSjk",
    authDomain: "mov-upload-web.firebaseapp.com",
    databaseURL: "https://mov-upload-web-default-rtdb.firebaseio.com",
    projectId: "mov-upload-web",
    storageBucket: "mov-upload-web.appspot.com",
    messagingSenderId: "537421557022",
    appId: "1:537421557022:web:cbde009cfad2986784ad0f",
    measurementId: "G-7XL9C196CH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);