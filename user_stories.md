# User Stories – Smart Clinic Management System

## Admin User Stories

**Title:**
_As an admin, I want to log into the portal with my username and password, so that I can manage the platform securely._

**Acceptance Criteria:**
1. Admin can enter username and password on the login page
2. Valid credentials redirect the admin to the Admin Dashboard
3. Invalid credentials show an error message

**Priority:** High
**Story Points:** 3
**Notes:**
- Passwords must be stored securely (hashed)

---

**Title:**
_As an admin, I want to log out of the portal, so that I can protect system access._

**Acceptance Criteria:**
1. A logout button is visible on the Admin Dashboard
2. Clicking logout ends the session / invalidates the token
3. Admin is redirected to the login page

**Priority:** High
**Story Points:** 1
**Notes:**
- Protected pages must not be accessible after logout

---

**Title:**
_As an admin, I want to add doctors to the portal, so that patients can book appointments with them._

**Acceptance Criteria:**
1. Admin can open a form to add a new doctor
2. Form includes name, specialty, email, phone, password, and available times
3. New doctor is saved and appears in the doctor list

**Priority:** High
**Story Points:** 3
**Notes:**
- Email must be unique

---

**Title:**
_As an admin, I want to delete a doctor's profile from the portal, so that I can remove doctors who no longer work at the clinic._

**Acceptance Criteria:**
1. Admin can select a doctor and click delete
2. A confirmation prompt appears before deletion
3. Doctor is removed from the database and the list

**Priority:** Medium
**Story Points:** 2
**Notes:**
- Consider handling of the doctor's existing appointments

---

**Title:**
_As an admin, I want to run a stored procedure in MySQL CLI to get the number of appointments per month, so that I can track usage statistics._

**Acceptance Criteria:**
1. A stored procedure counts appointments grouped by month
2. Admin can execute it from the MySQL CLI
3. Output shows month and total appointments

**Priority:** Medium
**Story Points:** 2
**Notes:**
- Useful for reports and monitoring clinic activity

## Patient User Stories

**Title:**
_As a patient, I want to view a list of doctors without logging in, so that I can explore options before registering._

**Acceptance Criteria:**
1. Doctor list is accessible without authentication
2. Each doctor shows name, specialty, and available times
3. Patient can search or filter by name or specialty

**Priority:** High
**Story Points:** 2
**Notes:**
- Booking requires login; viewing does not

---

**Title:**
_As a patient, I want to sign up using my email and password, so that I can book appointments._

**Acceptance Criteria:**
1. Sign-up form collects name, email, password, phone, and address
2. Duplicate emails show an error
3. After sign-up, the patient can log in

**Priority:** High
**Story Points:** 3
**Notes:**
- Validate email format and password strength

---

**Title:**
_As a patient, I want to log into the portal, so that I can manage my bookings._

**Acceptance Criteria:**
1. Patient can log in with email and password
2. Valid credentials redirect to the Patient Dashboard
3. Invalid credentials show an error message

**Priority:** High
**Story Points:** 2
**Notes:**
- Use token-based authentication

---

**Title:**
_As a patient, I want to log out of the portal, so that I can secure my account._

**Acceptance Criteria:**
1. Logout button is visible when logged in
2. Logout clears the session/token
3. Patient is redirected to the home page

**Priority:** Medium
**Story Points:** 1
**Notes:**
- Protected pages must not be accessible after logout

---

**Title:**
_As a patient, I want to log in and book an hour-long appointment, so that I can consult with a doctor._

**Acceptance Criteria:**
1. Patient can select a doctor, date, and available slot
2. Each appointment lasts one hour
3. The booked slot becomes unavailable to others

**Priority:** High
**Story Points:** 5
**Notes:**
- Prevent double booking; no bookings in the past

---

**Title:**
_As a patient, I want to view my upcoming appointments, so that I can prepare accordingly._

**Acceptance Criteria:**
1. Dashboard shows future appointments
2. Each shows doctor name, date, and time
3. Sorted by date, nearest first

**Priority:** Medium
**Story Points:** 2
**Notes:**
- Past appointments can be shown separately

## Doctor User Stories

**Title:**
_As a doctor, I want to log into the portal, so that I can manage my appointments._

**Acceptance Criteria:**
1. Doctor can log in with email and password
2. Valid credentials redirect to the Doctor Dashboard
3. Invalid credentials show an error message

**Priority:** High
**Story Points:** 2
**Notes:**
- Use token-based authentication

---

**Title:**
_As a doctor, I want to log out of the portal, so that I can protect my data._

**Acceptance Criteria:**
1. Logout button is visible on the Doctor Dashboard
2. Logout clears the session/token
3. Doctor is redirected to the login page

**Priority:** Medium
**Story Points:** 1
**Notes:**
- Protected pages must not be accessible after logout

---

**Title:**
_As a doctor, I want to view my appointment calendar, so that I can stay organized._

**Acceptance Criteria:**
1. Dashboard shows appointments for a selected date
2. Each appointment shows patient name and time
3. Doctor can switch between dates

**Priority:** High
**Story Points:** 3
**Notes:**
- Default view shows today's appointments

---

**Title:**
_As a doctor, I want to mark my unavailability, so that patients only see available slots._

**Acceptance Criteria:**
1. Doctor can mark dates/slots as unavailable
2. Unavailable slots are hidden from patients
3. Doctor can reopen a slot

**Priority:** High
**Story Points:** 3
**Notes:**
- Warn if a slot already has a booked appointment

---

**Title:**
_As a doctor, I want to update my profile with specialization and contact information, so that patients have up-to-date information._

**Acceptance Criteria:**
1. Doctor can edit specialization, phone, and email
2. Changes are saved to the database
3. Updates appear in the patient-facing doctor list

**Priority:** Medium
**Story Points:** 2
**Notes:**
- Validate email and phone format

---

**Title:**
_As a doctor, I want to view the patient details for upcoming appointments, so that I can be prepared._

**Acceptance Criteria:**
1. Doctor can open an appointment to see patient details
2. Details include name, contact info, and time
3. Doctor only sees their own patients

**Priority:** Medium
**Story Points:** 2
**Notes:**
- Patient data must be protected
