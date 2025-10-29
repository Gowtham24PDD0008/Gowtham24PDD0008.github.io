/* ==========================================================
   NovaFlare Portfolio — script.js
   Purpose: Handles navigation, theme, and smooth animations
   Author: Gowtham R. Novaflare
   ========================================================== */

/* ---------------------------
   1. SMOOTH SCROLL NAVIGATION
---------------------------- */
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);

    if (target) {
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: 'smooth'
      });
    }
  });
});

/* ---------------------------
   2. FADE-IN ON SCROLL
---------------------------- */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('section').forEach(section => {
  section.classList.add('fade-in');
  observer.observe(section);
});

/* ---------------------------
   3. NAVBAR SHADOW ON SCROLL
---------------------------- */
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

/* ---------------------------
   4. ACTIVE LINK HIGHLIGHT
---------------------------- */
window.addEventListener('scroll', () => {
  let current = '';
  document.querySelectorAll('section').forEach(section => {
    const sectionTop = section.offsetTop - 70;
    if (scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle(
      'active',
      link.getAttribute('href') === `#${current}`
    );
  });
});

/* ---------------------------
   5. THEME TOGGLE (Light/Dark)
---------------------------- */
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme');

// Apply saved theme on load
if (savedTheme === 'dark') {
  body.classList.add('dark-mode');
  themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
  const currentIcon = themeToggle.querySelector('i');
  const isDark = body.classList.toggle('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');

  // Smooth fade animation between icons
  currentIcon.classList.add('fade-out');

  setTimeout(() => {
    currentIcon.classList.remove('fade-out');
    currentIcon.classList.add('fade-in');
    currentIcon.className = isDark
      ? 'fa-solid fa-sun fade-in'
      : 'fa-solid fa-moon fade-in';

    setTimeout(() => currentIcon.classList.remove('fade-in'), 300);
  }, 200);
});

/* ---------------------------
   6. ACTIVE NAV LINK ON SCROLL
   (Reinforced for dynamic accuracy)
---------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === `#${current}`
      );
    });
  });
});

/* ---------------------------
   7. SCROLL REVEAL ANIMATIONS
---------------------------- */
const sr = ScrollReveal({
  distance: '50px',
  duration: 1000,
  delay: 200,
  reset: false // set true if you want animations to replay when scrolling up
});

// Section animations
sr.reveal('.hero-content', { origin: 'bottom' });
sr.reveal('#about', { origin: 'left' });
sr.reveal('#skills', { origin: 'right' });
sr.reveal('#projects .project-card', { origin: 'bottom', interval: 200 });
sr.reveal('#timeline', { origin: 'left' });
sr.reveal('#contact', { origin: 'bottom' });
