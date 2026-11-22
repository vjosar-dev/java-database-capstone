// adminDashboard.js - managing doctors

import { openModal } from "./components/modals.js";
import { getDoctors, filterDoctors, saveDoctor } from "./services/doctorServices.js";
import { createDoctorCard } from "./components/doctorCard.js";

// "Add Doctor" button (created by header.js)
document.addEventListener('DOMContentLoaded', () => {
  const addDocBtn = document.getElementById('addDocBtn');
  if (addDocBtn) {
    addDocBtn.addEventListener('click', () => {
      openModal('addDoctor');
    });
  }

  loadDoctorCards();

  // Search and filter listeners
  document.getElementById('searchBar').addEventListener('input', filterDoctorsOnChange);
  document.getElementById('filterTime').addEventListener('change', filterDoctorsOnChange);
  document.getElementById('filterSpecialty').addEventListener('change', filterDoctorsOnChange);
});

// Load all doctors on page load
async function loadDoctorCards() {
  try {
    const doctors = await getDoctors();
    renderDoctorCards(doctors);
  } catch (error) {
    console.error('Failed to load doctors:', error);
  }
}

// Filter doctors when search/filter values change
async function filterDoctorsOnChange() {
  const searchBar = document.getElementById('searchBar').value.trim();
  const filterTime = document.getElementById('filterTime').value;
  const filterSpecialty = document.getElementById('filterSpecialty').value;

  const name = searchBar.length > 0 ? searchBar : null;
  const time = filterTime.length > 0 ? filterTime : null;
  const specialty = filterSpecialty.length > 0 ? filterSpecialty : null;

  try {
    const response = await filterDoctors(name, time, specialty);
    const doctors = response.doctors || [];

    if (doctors.length > 0) {
      renderDoctorCards(doctors);
    } else {
      document.getElementById('content').innerHTML =
        '<p>No doctors found with the given filters.</p>';
    }
  } catch (error) {
    console.error('Failed to filter doctors:', error);
    alert('An error occurred while filtering doctors.');
  }
}

// Render a list of doctor cards
function renderDoctorCards(doctors) {
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = '';

  doctors.forEach(doctor => {
    const card = createDoctorCard(doctor);
    contentDiv.appendChild(card);
  });
}

// Add a new doctor (called from the "Add Doctor" modal form)
window.adminAddDoctor = async function () {
  // Collect form values
  const name = document.getElementById('doctorName').value;
  const specialty = document.getElementById('specialization').value;
  const email = document.getElementById('doctorEmail').value;
  const password = document.getElementById('doctorPassword').value;
  const phone = document.getElementById('doctorPhone').value;

  // Collect checked availability times
  const availableTimes = Array.from(
    document.querySelectorAll('input[name="availability"]:checked')
  ).map(cb => cb.value);

  // Admin must be logged in
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Admin not authenticated. Please log in again.');
    return;
  }

  const doctor = { name, specialty, email, password, phone, availableTimes };

  try {
    const { success, message } = await saveDoctor(doctor, token);

    if (success) {
      alert(message || 'Doctor added successfully!');
      document.getElementById('modal').style.display = 'none';
      loadDoctorCards();
    } else {
      alert('Error: ' + message);
    }
  } catch (error) {
    console.error('Error adding doctor:', error);
    alert('Something went wrong while adding the doctor.');
  }
};
