import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
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
const auth = getAuth(app);
const db = getFirestore(app);

/* 🔄 Load Appointments */
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    alert("Please login again");
    return;
  }

  const q = query(
    collection(db, "appointments"),
    where("doctorId", "==", user.uid)
  );

  const querySnapshot = await getDocs(q);
  const table = document.getElementById("appointmentTable");
  table.innerHTML = "";

  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${data.patientId}</td>
      <td>${data.date}</td>
      <td>${data.time}</td>
      <td>${data.status}</td>
      <td>
        <button class="confirm" onclick="updateStatus('${docSnap.id}', 'Confirmed')">Confirm</button>
        <button class="complete" onclick="updateStatus('${docSnap.id}', 'Completed')">Complete</button>
        <button class="cancel" onclick="updateStatus('${docSnap.id}', 'Cancelled')">Cancel</button>
      </td>
    `;
    table.appendChild(row);
  });
});

/* 🔁 Update Status */
window.updateStatus = async function (appointmentId, status) {
  await updateDoc(doc(db, "appointments", appointmentId), {
    status: status
  });
  alert("Status updated to " + status);
  location.reload();
};
