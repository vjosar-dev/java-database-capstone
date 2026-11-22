// doctorServices.js - all API calls related to doctors

import { API_BASE_URL } from "../config/config.js";

const DOCTOR_API = API_BASE_URL + '/doctor';

// Get all doctors
export async function getDoctors() {
  try {
    const response = await fetch(DOCTOR_API);
    const data = await response.json();
    return data.doctors || [];
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return [];
  }
}

// Delete a doctor (admin only)
export async function deleteDoctor(id, token) {
  try {
    const response = await fetch(`${DOCTOR_API}/${id}/${token}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    return { success: response.ok, message: data.message };
  } catch (error) {
    console.error('Error deleting doctor:', error);
    return { success: false, message: 'Error deleting doctor.' };
  }
}

// Save (add) a new doctor (admin only)
export async function saveDoctor(doctor, token) {
  try {
    const response = await fetch(`${DOCTOR_API}/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doctor)
    });
    const data = await response.json();
    return { success: response.ok, message: data.message };
  } catch (error) {
    console.error('Error saving doctor:', error);
    return { success: false, message: 'Error saving doctor.' };
  }
}

// Filter doctors by name, time and specialty
export async function filterDoctors(name, time, specialty) {
  try {
    // Use "null" for empty filters so the route stays valid
    const n = name && name.trim() !== '' ? encodeURIComponent(name) : 'null';
    const t = time && time !== '' ? time : 'null';
    const s = specialty && specialty !== '' ? specialty : 'null';

    const response = await fetch(`${DOCTOR_API}/filter/${n}/${t}/${s}`);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Failed to filter doctors:', response.statusText);
      return { doctors: [] };
    }
  } catch (error) {
    console.error('Error filtering doctors:', error);
    alert('Something went wrong while filtering doctors.');
    return { doctors: [] };
  }
}
