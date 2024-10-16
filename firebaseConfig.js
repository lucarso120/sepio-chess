// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration using environment variables
const firebaseConfig = {
    apiKey: "AIzaSyDFyaM3LsoqGdpsWpnBDD18uJP-9-sAhSk",
    authDomain: "sepiochess.firebaseapp.com",
    projectId: "sepiochess",
    storageBucket: "sepiochess.appspot.com",
    messagingSenderId: "770521277432",
    appId: "1:770521277432:web:59d46ae6d7dbc992b26c0d",
    measurementId: "G-2DLTHXV9PN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const db = getFirestore(app);

export {  db };
