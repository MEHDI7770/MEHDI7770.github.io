
/* =========================================
   MEHDI.DEV — INTERACTIONS
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // 1. MOBILE MENU
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navigationLinks = document.querySelectorAll(".nav-link");

  function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Ouvrir le menu");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Ouvrir le menu" : "Fermer le menu"
    );

    navLinks.classList.toggle("open", !isOpen);
  });

  navigationLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (
      !navLinks.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      closeMenu();
    }
  });

  // 2. ANIMATED INTRO TEXT
  const typedText = document.getElementById("typed-text");

  const phrases = [
    "Développeur en devenir",
    "Passionné de technologie",
    "Étudiant en informatique",
    "Toujours en apprentissage"
  ];

  let phraseIndex = 0;
  let characterIndex = phrases[0].length;
  let deleting = true;

  function typeEffect() {
    if (!typedText || prefersReducedMotion) {
      return;
    }

    const currentPhrase = phrases[phraseIndex];

    if (deleting) {
      characterIndex--;
      typedText.textContent = currentPhrase.substring(
        0,
        Math.max(0, characterIndex)
      );
    } else {
      characterIndex++;
      typedText.textContent = currentPhrase.substring(
        0,
        characterIndex
      );
    }

    let delay = deleting ? 35 : 65;

    if (!deleting && characterIndex === currentPhrase.length) {
      deleting = true;
      delay = 1800;
    } else if (deleting && characterIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 350;
    }

    window.setTimeout(typeEffect, delay);
  }

  if (!prefersReducedMotion) {
    window.setTimeout(typeEffect, 1800);
  }

  // 3. SCROLL REVEAL
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealElements.forEach((element, index) => {
      element.style.transitionDelay = `${(index % 3) * 80}ms`;
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // 4. HEADER + BACK TO TOP
  const header = document.querySelector(".header");
  const backToTop = document.getElementById("back-to-top");

  function handleScroll() {
    const scrollPosition = window.scrollY;

    header.classList.toggle("scrolled", scrollPosition > 20);
    backToTop.classList.toggle("visible", scrollPosition > 500);
  }

  window.addEventListener("scroll", handleScroll, {
    passive: true
  });

  handleScroll();

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth"
    });
  });

  // 5. ACTIVE NAVIGATION
  const sections = document.querySelectorAll(
    "main section[id]"
  );

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navigationLinks.forEach((link) => {
            const isActive =
              link.getAttribute("href") === `#${entry.target.id}`;

            link.classList.toggle("active", isActive);
          });
        });
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // 6. DYNAMIC FOOTER YEAR
  document.getElementById("year").textContent =
    new Date().getFullYear();

  // 7. SUBTLE MOUSE GLOW (DESKTOP ONLY)
  const cursorGlow = document.querySelector(".cursor-glow");
  const hasFinePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches;

  if (cursorGlow && hasFinePointer && !prefersReducedMotion) {
    Object.assign(cursorGlow.style, {
      position: "fixed",
      width: "300px",
      height: "300px",
      borderRadius: "50%",
      background:
        "radial-gradient(circle, rgba(139,112,255,0.055), transparent 70%)",
      pointerEvents: "none",
      zIndex: "0",
      transform: "translate(-50%, -50%)",
      left: "-500px",
      top: "-500px"
    });

    window.addEventListener(
      "mousemove",
      (event) => {
        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;
      },
      { passive: true }
    );
  } else if (cursorGlow) {
    cursorGlow.remove();
  }

  // 8. SOCIAL LINKS — CONFIGURATION
  // Remplace l'URL GitHub par ton vrai profil.
  const githubProfile = "https://github.com/";

  document.querySelectorAll(
    "#github-link, #github-projects-link"
  ).forEach((link) => {
    link.href = githubProfile;
  });

  console.log(
    "%cWelcome to Mehdi.dev",
    "color:#a997ff;font-size:18px;font-weight:bold;"
  );

  console.log(
    "Portfolio initialized successfully."
  );
});
