/* ==========================================================
   NovaFlare Portfolio — script.js
   Purpose: Handles navigation, theme, smooth animations,
            multi-page behavior, and contact form.
   Author: Gowtham R. Novaflare
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const navLinks = document.querySelectorAll(".nav-links a");

  /* ---------------------------
     1. SMOOTH SCROLL NAVIGATION
     (Works with: #about, index.html#about, ../index.html#about)
  ---------------------------- */
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (!href) return;

      // Only handle links that contain a "#"
      if (!href.includes("#")) return; // e.g. blog.html → normal navigation

      const hashIndex = href.indexOf("#");
      const hash = href.substring(hashIndex); // "#about"
      const target = document.querySelector(hash);

      // If the section exists on THIS page, do smooth scroll
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        });
      }
      // If not, browser will follow href to index.html#section (from blog pages)
    });
  });

  /* ---------------------------
     2. FADE-IN ON SCROLL
  ---------------------------- */
  const sections = document.querySelectorAll("section");
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.2 }
  );

  sections.forEach(section => {
    section.classList.add("fade-in");
    observer.observe(section);
  });

  /* ---------------------------
     3. NAVBAR SHADOW ON SCROLL
  ---------------------------- */
  window.addEventListener("scroll", () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 50);
  });

  /* ---------------------------
     4. ACTIVE LINK HIGHLIGHT
     (Handles #id and index.html#id / ../index.html#id)
  ---------------------------- */
  const sectionWithId = document.querySelectorAll("section[id]");

  if (sectionWithId.length > 0) {
    window.addEventListener("scroll", () => {
      let current = "";

      sectionWithId.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach(link => {
        link.classList.remove("active");
        const href = link.getAttribute("href") || "";

        // Match: "#about", "index.html#about", "../index.html#about"
        if (href === `#${current}` || href.endsWith(`#${current}`)) {
          link.classList.add("active");
        }
      });
    });
  }

  /* ---------------------------
     5. THEME TOGGLE (Light/Dark)
  ---------------------------- */
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;
  const savedTheme = localStorage.getItem("theme");

  // Apply saved theme on load
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    if (themeToggle) {
      themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = body.classList.toggle("dark-mode");
      localStorage.setItem("theme", isDark ? "dark" : "light");

      const currentIcon = themeToggle.querySelector("i");
      if (!currentIcon) return;

      // Smooth fade animation between icons
      currentIcon.classList.add("fade-out");

      setTimeout(() => {
        currentIcon.classList.remove("fade-out");
        currentIcon.classList.add("fade-in");
        currentIcon.className = isDark
          ? "fa-solid fa-sun fade-in"
          : "fa-solid fa-moon fade-in";

        setTimeout(() => currentIcon.classList.remove("fade-in"), 300);
      }, 200);
    });
  }

  /* ---------------------------
     6. SCROLL REVEAL ANIMATIONS
  ---------------------------- */
  if (typeof ScrollReveal !== "undefined") {
    const sr = ScrollReveal({
      distance: "50px",
      duration: 1000,
      delay: 200,
      reset: false // set true if you want animations to replay when scrolling up
    });

    // Hero
    sr.reveal(".hero-content", { origin: "bottom" });

    // About section (image + content)
    sr.reveal("#about .about-image", { origin: "left" });
    sr.reveal("#about .about-content", { origin: "right", delay: 250 });

    // Skills cards
    sr.reveal("#skills .skill-category", { origin: "bottom", interval: 200 });

    // Projects cards
    sr.reveal("#projects .project-card", {
      origin: "bottom",
      interval: 200
    });

    // Journey timeline items (your "My Journey" cards)
    sr.reveal("#journey .timeline-item", { origin: "left", interval: 200 });

    // Contact section
    sr.reveal("#contact .contact-form", { origin: "left" });
    sr.reveal("#contact .contact-info", { origin: "right", delay: 250 });

    // Blog grid (if present on blog.html)
    sr.reveal(".projects.blog-list .project-card", {
      origin: "bottom",
      interval: 200
    });
  }

  /* ---------------------------
     7. CONTACT FORM (Google Apps Script)
  ---------------------------- */
  const form = document.getElementById("contactForm");
  const statusMsg = document.getElementById("form-status");

  if (form && statusMsg) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      statusMsg.style.display = "block";
      statusMsg.style.color = "#d4af37";
      statusMsg.textContent = "Sending message... ⏳";

      const formData = new FormData(form);

      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbysurQKw5WTWajs9zlkbkxvdrpg4n3W-4w5IXd53Oeyds7KqaHWSPm62E0-5zE9JqEK/exec",
          {
            method: "POST",
            body: formData
          }
        );

        const text = await response.text();

        if (text.includes("SUCCESS")) {
          statusMsg.style.color = "green";
          statusMsg.textContent = "Message sent successfully! 📩✨";
          form.reset();
        } else {
          throw new Error(text);
        }
      } catch (error) {
        console.error(error);
        statusMsg.style.color = "red";
        statusMsg.textContent = "Something went wrong! Please try again.";
      }
    });
  }
});
