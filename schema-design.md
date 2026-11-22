# Smart Clinic Management System – Schema Design

## MySQL Database Design

Core operational data (users, appointments) is structured and related, so it lives in MySQL.

### Table: admin
- id: INT, Primary Key, Auto Increment
- username: VARCHAR(50), Not Null, Unique
- password: VARCHAR(255), Not Null  <!-- stored hashed -->

### Table: doctors
- id: INT, Primary Key, Auto Increment
- name: VARCHAR(100), Not Null
- specialty: VARCHAR(50), Not Null
- email: VARCHAR(100), Not Null, Unique  <!-- format validated in code -->
- password: VARCHAR(255), Not Null
- phone: VARCHAR(15), Not Null  <!-- 10-digit format validated in code -->

### Table: doctor_available_times
- id: INT, Primary Key, Auto Increment
- doctor_id: INT, Foreign Key → doctors(id), Not Null, ON DELETE CASCADE
- available_time: VARCHAR(20), Not Null  <!-- e.g. "09:00-10:00" -->

<!-- Each doctor has their own time slots; slots are removed if the doctor is deleted -->

### Table: patients
- id: INT, Primary Key, Auto Increment
- name: VARCHAR(100), Not Null
- email: VARCHAR(100), Not Null, Unique
- password: VARCHAR(255), Not Null
- phone: VARCHAR(15), Not Null
- address: VARCHAR(255), Not Null

### Table: appointments
- id: INT, Primary Key, Auto Increment
- doctor_id: INT, Foreign Key → doctors(id), Not Null
- patient_id: INT, Foreign Key → patients(id), Not Null
- appointment_time: DATETIME, Not Null
- status: INT, Not Null, Default 0 (0 = Scheduled, 1 = Completed, 2 = Cancelled)
- UNIQUE (doctor_id, appointment_time)  <!-- prevents overlapping bookings for the same doctor -->

<!-- Design decisions:
- Appointments last 1 hour; end time = appointment_time + 1 hour.
- Deleting a patient or doctor should NOT silently delete appointment history;
  use soft delete (or restrict deletion) to keep medical records for auditing.
- Past appointments are kept as history (status = Completed).
-->

## MongoDB Collection Design

Prescriptions have flexible, nested data (multiple medications, notes, pharmacy info)
and the format may evolve, so they are stored in MongoDB.

### Collection: prescriptions
```json
{
  "_id": "ObjectId('64abc123456')",
  "patientName": "John Smith",
  "appointmentId": 51,
  "medications": [
    {
      "name": "Paracetamol",
      "dosage": "500mg",
      "frequency": "Every 6 hours",
      "durationDays": 5
    },
    {
      "name": "Ibuprofen",
      "dosage": "200mg",
      "frequency": "Twice a day after meals",
      "durationDays": 3
    }
  ],
  "doctorNotes": "Drink plenty of water and rest.",
  "refillCount": 2,
  "pharmacy": {
    "name": "Walgreens SF",
    "location": "Market Street"
  },
  "tags": ["fever", "pain-relief"],
  "createdAt": "2026-11-22T10:30:00Z"
}
```

<!-- Design decisions:
- The prescription references the appointment by appointmentId (MySQL id)
  instead of embedding the full patient object, to avoid duplicating data.
- patientName is stored for quick display without a cross-database lookup.
- The medications array allows any number of drugs per prescription.
- New fields (e.g. attachments, pharmacist notes) can be added later
  without schema migrations.
-->
