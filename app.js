import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* 🔥 Firebase Config */
const firebaseConfig = {
    apiKey: "AIzaSyBO1paUTwXDm1UBf0A8OQ_kb4AGWB2IlWg",
    authDomain: "hospitalappointmentmanagement.firebaseapp.com",
    projectId: "hospitalappointmentmanagement",
    storageBucket: "hospitalappointmentmanagement.firebasestorage.app",
    messagingSenderId: "468085395768",
    appId: "1:468085395768:web:fbe9b6b48c4c67c17771cd",
    measurementId: "G-D44MJP7H7V"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/* ✅ Register User */
window.register = async function () {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
      role: role
    });

    alert("Registration successful!");
  } catch (error) {
    alert(error.message);
  }
};

/* ✅ Login User */
window.login = async function () {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      alert("User role not found");
      return;
    }

    const role = docSnap.data().role;
    console.log("Logged in role:", role); // 🔍 debug

    if (role === "patient") {
      window.location.href = "patient.html";
    } 
    else if (role === "doctor") {
      window.location.href = "doctor.html";   // ✅ DOCTOR REDIRECT
    } 
    else if (role === "admin") {
      window.location.href = "admin.html";
    } 
    else {
      alert("Invalid role");
    }

  } catch (error) {
    alert(error.message);
  }
};