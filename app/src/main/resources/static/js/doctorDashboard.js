// doctorDashboard.js - managing appointments

import { getAllAppointments } from "./services/appointmentRecordService.js";
import { createPatientRow } from "./components/patientRows.js";

// Global variables
const tableBody = document.getElementById('patientTableBody');
let selectedDate = new Date().toISOString().split('T')[0]; // today, YYYY-MM-DD
const token = localStorage.getItem('token');
let patientName = null;

// Search bar: filter by patient name
document.getElementById('searchBar').addEventListener('input', (e) => {
  const value = e.target.value.trim();
  patientName = value.length > 0 ? value : 'null';
  loadAppointments();
});

// "Today's Appointments" button
document.getElementById('todayButton').addEventListener('click', () => {
  selectedDate = new Date().toISOString().split('T')[0];
  document.getElementById('datePicker').value = selectedDate;
  loadAppointments();
});

// Date picker
document.getElementById('datePicker').addEventListener('change', (e) => {
  selectedDate = e.target.value;
  loadAppointments();
});

// Load appointments for the selected date and patient name
async function loadAppointments() {
  try {
    const response = await getAllAppointments(selectedDate, patientName, token);
    const appointments = response.appointments || [];

    tableBody.innerHTML = '';

    if (appointments.length === 0) {
      tableBody.innerHTML =
        `<tr><td colspan="5" class="noPatientRecord">No Appointments found for today.</td></tr>`;
      return;
    }

    appointments.forEach(appointment => {
      const patient = {
        id: appointment.patientId,
        name: appointment.patientName,
        phone: appointment.patientPhone,
        email: appointment.patientEmail
      };

      const row = createPatientRow(patient, appointment.id, appointment.doctorId);
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error loading appointments:', error);
    tableBody.innerHTML =
      `<tr><td colspan="5" class="noPatientRecord">Error loading appointments. Try again later.</td></tr>`;
  }
}

// Initial render on page load
document.addEventListener('DOMContentLoaded', () => {
  if (typeof renderContent === 'function') {
    renderContent();
  }
  document.getElementById('datePicker').value = selectedDate;
  loadAppointments();
});
