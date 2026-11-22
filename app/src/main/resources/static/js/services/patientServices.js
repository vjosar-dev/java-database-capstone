// patientServices.js - all API calls related to patients

import { API_BASE_URL } from "../config/config.js";

const PATIENT_API = API_BASE_URL + '/patient';

// Patient sign-up
export async function patientSignup(data) {
  try {
    const response = await fetch(`${PATIENT_API}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    return { success: response.ok, message: result.message };
  } catch (error) {
    console.error('Error during patient signup:', error);
    return { success: false, message: error.message };
  }
}

// Patient login - returns the full response so the caller can read status and token
export async function patientLogin(data) {
  console.log('patientLogin :: ', data); // remove in production
  return await fetch(`${PATIENT_API}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

// Get the logged-in patient's data
export async function getPatientData(token) {
  try {
    const response = await fetch(`${PATIENT_API}/${token}`);
    const data = await response.json();
    if (response.ok) return data.patient;
    return null;
  } catch (error) {
    console.error('Error fetching patient details:', error);
    return null;
  }
}

// Get appointments - works for both patient and doctor dashboards
export async function getPatientAppointments(id, token, user) {
  try {
    const response = await fetch(`${PATIENT_API}/${id}/${user}/${token}`);
    const data = await response.json();
    if (response.ok) {
      return data.appointments;
    }
    return null;
  } catch (error) {
    console.error('Error fetching patient appointments:', error);
    return null;
  }
}

// Filter appointments by condition ("pending" / "consulted") and name
export async function filterAppointments(condition, name, token) {
  try {
    const response = await fetch(`${PATIENT_API}/filter/${condition}/${name}/${token}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Failed to fetch appointments:', response.statusText);
      return { appointments: [] };
    }
  } catch (error) {
    console.error('Error filtering appointments:', error);
    alert('Something went wrong!');
    return { appointments: [] };
  }
}
