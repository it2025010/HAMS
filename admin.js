import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
const db = getFirestore(app);

/* ➕ Add Doctor */
window.addDoctor = async function () {
  const name = document.getElementById("docName").value;
  const spec = document.getElementById("docSpec").value;
  const slots = document.getElementById("docSlots").value.split(",");

  if (!name || !spec || slots.length === 0) {
    alert("Fill all fields");
    return;
  }

  await addDoc(collection(db, "doctors"), {
    name: name,
    specialization: spec,
    availableSlots: slots
  });

  alert("Doctor added");
  loadDoctors();
};

/* 👨‍⚕️ Load Doctors */
async function loadDoctors() {
  const table = document.getElementById("doctorTable");
  table.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "doctors"));
  querySnapshot.forEach((docSnap) => {
    const d = docSnap.data();
    table.innerHTML += `
      <tr>
        <td>${d.name}</td>
        <td>${d.specialization}</td>
        <td>${d.availableSlots.join(", ")}</td>
      </tr>
    `;
  });
}

/* 📅 Load Appointments */
async function loadAppointments() {
  const table = document.getElementById("appointmentTable");
  table.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "appointments"));
  querySnapshot.forEach((docSnap) => {
    const a = docSnap.data();
    table.innerHTML += `
      <tr>
        <td>${a.patientId}</td>
        <td>${a.doctorId}</td>
        <td>${a.date}</td>
        <td>${a.time}</td>
        <td>${a.status}</td>
        <td>
          <button class="cancel" onclick="deleteAppointment('${docSnap.id}')">Cancel</button>
        </td>
      </tr>
    `;
  });
}

/* ❌ Cancel Appointment */
window.deleteAppointment = async function (id) {
  await deleteDoc(doc(db, "appointments", id));
  alert("Appointment cancelled");
  loadAppointments();
};

/* 🚀 Init */
loadDoctors();
loadAppointments();
