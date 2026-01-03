import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc
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

/* 🔄 Load Doctors */
async function loadDoctors() {
  const querySnapshot = await getDocs(collection(db, "doctors"));
  const doctorSelect = document.getElementById("doctorSelect");

  querySnapshot.forEach((doc) => {
    const option = document.createElement("option");
    option.value = doc.id;
    option.text = doc.data().name + " (" + doc.data().specialization + ")";
    option.dataset.slots = JSON.stringify(doc.data().availableSlots);
    doctorSelect.appendChild(option);
  });
}

/* ⏰ Load Time Slots */
document.getElementById("doctorSelect").addEventListener("change", function () {
  const selectedOption = this.options[this.selectedIndex];
  const slots = JSON.parse(selectedOption.dataset.slots || "[]");

  const timeSelect = document.getElementById("timeSelect");
  timeSelect.innerHTML = '<option value="">Select Time Slot</option>';

  slots.forEach(slot => {
    const option = document.createElement("option");
    option.value = slot;
    option.text = slot;
    timeSelect.appendChild(option);
  });
});

/* 📅 Book Appointment */
window.bookAppointment = async function () {
  const doctorId = document.getElementById("doctorSelect").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("timeSelect").value;

  if (!doctorId || !date || !time) {
    alert("Please fill all fields");
    return;
  }

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      await addDoc(collection(db, "appointments"), {
        patientId: user.uid,
        doctorId: doctorId,
        date: date,
        time: time,
        status: "Pending"
      });

      alert("Appointment booked successfully!");
    } else {
      alert("Please login again");
    }
  });
};

/* 🚀 Initialize */
loadDoctors();
