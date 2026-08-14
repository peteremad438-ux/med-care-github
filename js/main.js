/* ══ MedCare Main JS ══ */

// ── PRELOADER ──
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    preloader.classList.add("hidden");
  }, 1200);
});

// ── NAVBAR SCROLL ──
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);

  const sections = document.querySelectorAll("section[id], header[id]");
  let current = "";
  sections.forEach((sec) => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`,
    );
  });
});

// ── MOBILE MENU ──
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const mobileOverlay = document.getElementById("mobileOverlay");

function toggleMenu(open) {
  hamburger.classList.toggle("open", open);
  mobileMenu.classList.toggle("open", open);
  mobileOverlay.classList.toggle("show", open);
  document.body.style.overflow = open ? "hidden" : "";
}

hamburger.addEventListener("click", () =>
  toggleMenu(!mobileMenu.classList.contains("open")),
);
mobileOverlay.addEventListener("click", () => toggleMenu(false));
document.querySelectorAll(".mobile-menu .nav-link").forEach((link) => {
  link.addEventListener("click", () => toggleMenu(false));
});

// ── COUNT-UP ANIMATION ──
function animateCount(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent =
      target >= 1000
        ? (start / 1000).toFixed(start >= target ? 0 : 1) + "k"
        : Math.floor(start);
  }, 16);
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target);
        const countEl = entry.target.querySelector(".count");
        animateCount(countEl, target);
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 },
);

document
  .querySelectorAll(".stat-item[data-target]")
  .forEach((el) => statsObserver.observe(el));

// ── SCROLL REVEAL ──
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(
          () => entry.target.classList.add("visible"),
          parseInt(delay),
        );
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);

document
  .querySelectorAll(
    ".service-card, .doctor-card, .blog-card, .about-feat, .contact-item, .section-header, .about-content, .contact-info, .testi-card, .stat-item",
  )
  .forEach((el) => {
    el.classList.add("reveal");
    revealObserver.observe(el);
  });

// ── CONTACT FORM ──
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector("button[type=submit]");
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
    btn.style.background = "#16a34a";
    setTimeout(() => {
      btn.innerHTML = '<i class="fa-regular fa-paper-plane"></i> Send Message';
      btn.style.background = "";
      contactForm.reset();
    }, 3000);
  });
}
