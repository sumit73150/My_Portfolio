// Typing animation
var typed = new Typed("#typed", {
  strings: ["Sumit Verma", "Front-End Developer", "Python Programmer", "Tech Enthusiast"],
  typeSpeed: 60,
  backSpeed: 40,
  loop: true,
});

// Close nav on link click
const navLinks = document.querySelector('.nav-links'); // ✅ FIXED
const navLinksList = document.querySelectorAll('.nav-links a');
navLinksList.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Filter projects
const filterBtns = document.querySelectorAll(".filter");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((button) => button.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    projectCards.forEach((card) => {
      card.style.display = (filter === "all" || card.classList.contains(filter)) ? "block" : "none";
    });
  });
});

// Contact form submission (✅ via backend)
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = this.name.value;
  const email = this.email.value;
  const message = this.message.value;

  status.textContent = "⏳ Sending...";

  try {
    const API_BASE = window.location.hostname.includes("localhost")
      ? "http://localhost:5000"
      : "https://sumitverma-production.up.railway.app";

    const res = await fetch(`${API_BASE}/api/contact`, { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await res.json();
    status.textContent = data.success ? "✅ Message sent successfully!" : "❌ Failed to send message.";
    status.style.color = data.success ? "green" : "red";
    if (data.success) form.reset();
  } catch (err) {
    console.error(err);
    status.textContent = "❌ Error connecting to server.";
    status.style.color = "red";
  }
});

// Modal functionality
document.addEventListener("DOMContentLoaded", function () {
  const sharedModal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const sharedClose = document.getElementById("closeModal");

  const learnXModal = document.getElementById("modal1");
  const learnXClose = document.getElementById("closeModal1");

  const sharedProjectCards = document.querySelectorAll(".project-card:not(.personal)");

  sharedProjectCards.forEach(card => {
    card.addEventListener("click", function () {
      const title = card.getAttribute("data-title");
      const description = card.getAttribute("data-description");

      modalTitle.textContent = title;
      modalDescription.textContent = description;
      sharedModal.style.display = "block";
    });
  });

  sharedClose.addEventListener("click", () => {
    sharedModal.style.display = "none";
  });

  window.openModal = function (id) {
    document.getElementById(id).style.display = "block";
  };

  learnXClose.addEventListener("click", () => {
    learnXModal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === sharedModal) sharedModal.style.display = "none";
    if (event.target === learnXModal) learnXModal.style.display = "none";
  });
});

// Year auto update
document.getElementById("year").textContent = new Date().getFullYear();

// Time auto update
function updateTime() {
  const now = new Date();
  document.getElementById("time").textContent =
    "| " + now.toLocaleTimeString();
}
setInterval(updateTime, 1000);
updateTime();

// Dark Mode Toggle
const toggle = document.getElementById("darkModeToggle");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    toggle.textContent = "☀️ Light Mode";
  } else {
    localStorage.setItem("theme", "light");
    toggle.textContent = "🌙 Dark Mode"; // ✅ FIXED
  }
});

// Load preference on page load
window.addEventListener("load", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    toggle.textContent = "☀️ Light Mode";
  }
});
