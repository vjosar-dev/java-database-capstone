// patientDashboard.js - viewing & filtering doctors, patient login/signup

import { createDoctorCard } from "./components/doctorCard.js";
import { openModal } from "./components/modals.js";
import { getDoctors, filterDoctors } from "./services/doctorServices.js";
import { patientLogin, patientSignup } from "./services/patientServices.js";

// Load doctor cards on page load
document.addEventListener('DOMContentLoaded', () => {
  loadDoctorCards();
});

// Bind modal triggers for Signup and Login
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('patientSignup');
  if (btn) btn.addEventListener('click', () => openModal('patientSignup'));
});

document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById('patientLogin');
  if (loginBtn) loginBtn.addEventListener('click', () => openModal('patientLogin'));
});

// Search and filter listeners
document.getElementById('searchBar').addEventListener('input', filterDoctorsOnChange);
document.getElementById('filterTime').addEventListener('change', filterDoctorsOnChange);
document.getElementById('filterSpecialty').addEventListener('change', filterDoctorsOnChange);

// Fetch and render all doctors
async function loadDoctorCards() {
  try {
    const doctors = await getDoctors();
    renderDoctorCards(doctors);
  } catch (error) {
    console.error('Failed to load doctors:', error);
  }
}

// Filter doctors by name, time and specialty
function filterDoctorsOnChange() {
  const searchBar = document.getElementById('searchBar').value.trim();
  const filterTime = document.getElementById('filterTime').value;
  const filterSpecialty = document.getElementById('filterSpecialty').value;

  const name = searchBar.length > 0 ? searchBar : null;
  const time = filterTime.length > 0 ? filterTime : null;
  const specialty = filterSpecialty.length > 0 ? filterSpecialty : null;

  filterDoctors(name, time, specialty)
    .then(response => {
      const doctors = response.doctors || [];
      const contentDiv = document.getElementById('content');
      contentDiv.innerHTML = '';

      if (doctors.length > 0) {
        doctors.forEach(doctor => {
          contentDiv.appendChild(createDoctorCard(doctor));
        });
      } else {
        contentDiv.innerHTML = '<p>No doctors found with the given filters.</p>';
      }
    })
    .catch(error => {
      console.error('Failed to filter doctors:', error);
      alert('An error occurred while filtering doctors.');
    });
}

// Render a given list of doctors (usable by other modules)
export function renderDoctorCards(doctors) {
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = '';

  doctors.forEach(doctor => {
    contentDiv.appendChild(createDoctorCard(doctor));
  });
}

// Patient signup (called from the signup modal form)
window.signupPatient = async function () {
  try {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

    const data = { name, email, password, phone, address };
    const { success, message } = await patientSignup(data);

    if (success) {
      alert(message);
      document.getElementById('modal').style.display = 'none';
      window.location.reload();
    } else {
      alert(message);
    }
  } catch (error) {
    console.error('Signup failed:', error);
    alert('An error occurred while signing up.');
  }
};

// Patient login (called from the login modal form)
window.loginPatient = async function () {
  try {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const data = { email, password };
    const response = await patientLogin(data);

    if (response.ok) {
      const result = await response.json();
      localStorage.setItem('token', result.token);
      selectRole('loggedPatient');
      window.location.href = '/pages/loggedPatientDashboard.html';
    } else {
      alert('Invalid credentials!');
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('Failed to login.');
  }
};
