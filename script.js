   var typed = new Typed("#typed", {
      strings: ["Sumit Verma", "Front-End Developer", "Python Programmer", "Tech Enthusiast"],
      typeSpeed: 60,
      backSpeed: 40,
      loop: true,
    });

  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });


    const navLinksList = document.querySelectorAll('.nav-links a');
  navLinksList.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

   window.onscroll = function () {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.querySelector('.scroll-bar').style.width = scrolled + "%";
  };


    const toggle = document.getElementById("darkModeToggle");
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });

  let mybutton = document.getElementById("scrollTopBtn");
window.onscroll = function () {
  if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
};
function topFunction() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


  const year = new Date().getFullYear();
  document.getElementById("year").textContent = year;

  setInterval(() => {
    const now = new Date();
    document.getElementById("time").textContent = now.toLocaleTimeString();
  }, 1000);

// Filter functionality
const filterBtns = document.querySelectorAll(".filter");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove 'active' class from all buttons
    filterBtns.forEach((button) => button.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    projectCards.forEach((card) => {
      // If filter is "all", show all cards
      if (filter === "all") {
        card.style.display = "block";
      } else {
        // Otherwise show only matching ones
        if (card.classList.contains(filter)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      }
    });
  });
});



const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  emailjs.sendForm('service_jvctdia', 'template_m23y2um', this)
    .then(() => {
      status.innerHTML = "✅ Message sent successfully!";
      status.style.color = "green";
      form.reset();
    }, (error) => {
      status.innerHTML = "❌ Failed to send message. Please try again!";
      status.style.color = "red";
      console.error(error);
    });
});


  (function () {
    emailjs.init("NMB8LhT8jsZC6ucbO"); // Your EmailJS public key
  })();

  document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs
      .sendForm("service_jvctdia", "template_m23y2um", this)
      .then(
        function () {
          document.getElementById("form-status").innerText = "✅ Message sent successfully!";
        },
        function (error) {
          document.getElementById("form-status").innerText = "❌ Failed to send message. Please try again.";
          console.error("EmailJS Error:", error);
        }
      );
  });

document.addEventListener("DOMContentLoaded", function () {
  const sharedModal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const sharedClose = document.getElementById("closeModal");

  const learnXModal = document.getElementById("modal1");
  const learnXClose = document.getElementById("closeModal1");

  // Handle shared modal (all except Learn X)
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

  // Close shared modal
  sharedClose.addEventListener("click", () => {
    sharedModal.style.display = "none";
  });

  // Learn X modal control
  window.openModal = function (id) {
    document.getElementById(id).style.display = "block";
  };

  learnXClose.addEventListener("click", () => {
    learnXModal.style.display = "none";
  });

  // Close any modal on outside click
  window.addEventListener("click", (event) => {
    if (event.target === sharedModal) {
      sharedModal.style.display = "none";
    }
    if (event.target === learnXModal) {
      learnXModal.style.display = "none";
    }
  });
});


