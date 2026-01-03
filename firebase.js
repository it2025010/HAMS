import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBO1paUTwXDm1UBf0A8OQ_kb4AGWB2IlWg",
    authDomain: "hospitalappointmentmanagement.firebaseapp.com",
    projectId: "hospitalappointmentmanagement",
    storageBucket: "hospitalappointmentmanagement.firebasestorage.app",
    messagingSenderId: "468085395768",
    appId: "1:468085395768:web:fbe9b6b48c4c67c17771cd",
    measurementId: "G-D44MJP7H7V"
  };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);