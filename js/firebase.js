/* =========================================
   Stream Guides
   Firebase Configuration
========================================= */

"use strict";

const firebaseConfig = {
    apiKey: "AIzaSyC7N50jluVxl38aHnVhPDGsH1o2V7KlGzk",
    authDomain: "stream-guides.firebaseapp.com",
    projectId: "stream-guides",
    storageBucket: "stream-guides.firebasestorage.app",
    messagingSenderId: "88865512366",
    appId: "1:88865512366:web:95af39a01c4befb440c63f"
};


/* =========================================
   Initialize Firebase
========================================= */

if (!firebase.apps.length) {

    firebase.initializeApp(firebaseConfig);

}


/* =========================================
   Firebase Services
========================================= */

const auth = firebase.auth();

const db = firebase.firestore();