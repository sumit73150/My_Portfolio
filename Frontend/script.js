// Typing animation
var typed = new Typed("#typed", {
  strings: ["Sumit Verma", "Front-End Developer", "Python Programmer", "Tech Enthusiast"],
  typeSpeed: 60,
  backSpeed: 40,
  loop: true,
});

// Mobile nav toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close nav on link click
const navLinksList = document.querySelectorAll('.nav-links a');
navLinksList.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Scroll progress bar
window.onscroll = function () {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.querySelector('.scroll-bar').style.width = scrolled + "%";

  // Scroll-to-top button
  if (winScroll > 400) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
};

// Scroll-to-top button
let mybutton = document.getElementById("scrollTopBtn");
function topFunction() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Year and time update
const year = new Date().getFullYear();
document.getElementById("year").textContent = year;

setInterval(() => {
  const now = new Date();
  document.getElementById("time").textContent = now.toLocaleTimeString();
}, 1000);

// Dark mode toggle
const toggle = document.getElementById("darkModeToggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
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
    const res = await fetch("http://localhost:5000/contact", {
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


// const res = await fetch("http://localhost:5000/contact", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ name, email, message }),
// });
