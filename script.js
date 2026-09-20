```javascript
const home = document.getElementById("homePage");
const registration = document.getElementById("registrationPage");
const confirmation = document.getElementById("confirmationPage");
const form = document.getElementById("leadForm");

const menuButton = document.getElementById("menuButton");
const mobileNav = document.getElementById("mobileNav");

let interval;
let seconds = 900;


/* Mobile menu */

menuButton.addEventListener("click", () => {
  mobileNav.classList.toggle("open");
});


document.querySelectorAll(".mobile-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
  });
});


/* Page switching */

function showPage(page) {
  [home, registration, confirmation].forEach((section) => {
    section.style.display = "none";
  });

  page.style.display = "block";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


function showHome() {
  clearInterval(interval);

  showPage(home);

  history.replaceState(
    {},
    "",
    window.location.pathname
  );
}


function showRegistration() {
  showPage(registration);

  history.replaceState(
    {},
    "",
    "#registration"
  );

  startTimer();
}


function showConfirmation() {
  clearInterval(interval);

  const referenceNumber =
    "REG-" +
    Date.now()
      .toString()
      .slice(-8);

  document.getElementById("reference").textContent =
    referenceNumber;

  showPage(confirmation);

  history.replaceState(
    {},
    "",
    "#confirmation"
  );
}


/* Demo timer */

function startTimer() {
  clearInterval(interval);

  seconds = 900;

  renderTimer();

  interval = setInterval(() => {
    seconds--;

    renderTimer();

    if (seconds <= 0) {
      clearInterval(interval);
    }
  }, 1000);
}


function renderTimer() {
  const minutes = String(
    Math.floor(seconds / 60)
  ).padStart(2, "0");

  const remainingSeconds = String(
    seconds % 60
  ).padStart(2, "0");

  document.getElementById("timer").textContent =
    minutes + ":" + remainingSeconds;
}


/* Copy demo UPI */

function copyDemoUpi() {
  const demoUPI = "demo-registration@invalid";

  if (
    navigator.clipboard &&
    navigator.clipboard.writeText
  ) {
    navigator.clipboard.writeText(demoUPI);
  }

  document.getElementById("copyMessage").textContent =
    "Demo UPI copied. It is intentionally non-functional.";
}


/* Form submission */

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formMessage =
    document.getElementById("formMessage");

  formMessage.style.display = "block";

  formMessage.textContent =
    "✓ Enquiry submitted successfully!";

  setTimeout(() => {
    showRegistration();
  }, 900);
});


/* Demo QR */

document.getElementById("demoQr").src =
  "https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=" +
  encodeURIComponent(
    "DEMO ONLY - NOT A REAL PAYMENT"
  );


/* Handle URL hash */

if (window.location.hash === "#registration") {
  showRegistration();
}

if (window.location.hash === "#confirmation") {
  showConfirmation();
}
```
