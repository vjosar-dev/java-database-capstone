// header.js
// Renders a role-based header into <div id="header"></div>

function renderHeader() {
  const headerDiv = document.getElementById("header");
  if (!headerDiv) return;

  // 1. On the homepage (role selection) show a plain header and clear the session
  if (window.location.pathname.endsWith("/")) {
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    headerDiv.innerHTML = `
      <header class="header">
        <div class="logo-section">
          <img src="/assets/images/logo/logo.png" alt="Hospital CRM Logo" class="logo-img">
          <span class="logo-title">Hospital CMS</span>
        </div>
      </header>`;
    return;
  }

  // 2. Read role and token from localStorage
  const role = localStorage.getItem("userRole");
  const token = localStorage.getItem("token");

  // 3. Invalid session: a role that needs login but has no token
  if ((role === "loggedPatient" || role === "admin" || role === "doctor") && !token) {
    localStorage.removeItem("userRole");
    alert("Session expired or invalid login. Please log in again.");
    window.location.href = "/";
    return;
  }

  // 4. Build the header based on the role
  let headerContent = `
    <header class="header">
      <div class="logo-section">
        <img src="/assets/images/logo/logo.png" alt="Hospital CRM Logo" class="logo-img">
        <span class="logo-title">Hospital CMS</span>
      </div>
      <nav>`;

  if (role === "admin") {
    headerContent += `
        <button id="addDocBtn" class="adminBtn" onclick="openModal('addDoctor')">Add Doctor</button>
        <a href="#" onclick="logout()">Logout</a>`;
  } else if (role === "doctor") {
    headerContent += `
        <button id="doctorHomeBtn" class="adminBtn" onclick="selectRole('doctor')">Home</button>
        <a href="#" onclick="logout()">Logout</a>`;
  } else if (role === "patient") {
    headerContent += `
        <button id="patientLogin" class="adminBtn">Login</button>
        <button id="patientSignup" class="adminBtn">Sign Up</button>`;
  } else if (role === "loggedPatient") {
    headerContent += `
        <button id="home" class="adminBtn" onclick="window.location.href='/pages/loggedPatientDashboard.html'">Home</button>
        <button id="patientAppointments" class="adminBtn" onclick="window.location.href='/pages/patientAppointments.html'">Appointments</button>
        <a href="#" onclick="logoutPatient()">Logout</a>`;
  }

  headerContent += `
      </nav>
    </header>`;

  // 5. Inject the header and attach listeners to the new buttons
  headerDiv.innerHTML = headerContent;
  attachHeaderButtonListeners();
}

// Buttons are created dynamically, so listeners are attached after insertion
function attachHeaderButtonListeners() {
  const login = document.getElementById("patientLogin");
  const signup = document.getElementById("patientSignup");

  if (login) {
    login.addEventListener("click", () => openModal("patientLogin"));
  }
  if (signup) {
    signup.addEventListener("click", () => openModal("patientSignup"));
  }
}

// Logout for admin / doctor: clear session and go back to role selection
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userRole");
  window.location.href = "/";
}

// Logout for patient: keep role as "patient" so Login / Sign Up show again
function logoutPatient() {
  localStorage.removeItem("token");
  localStorage.setItem("userRole", "patient");
  window.location.href = "/pages/patientDashboard.html";
}

renderHeader();