// Main JavaScript file - imports all other scripts
import { initializeCookieBar } from "./cookieBar.js";
import { initializeMobileMenu } from "./mobileMenu.js";
import { initializeDataLoader } from "./dataLoader.js";
import { initializeFormValidation } from "./formValidation.js";
import { initializeNewsExpander } from "./newsExpander.js";
import { initializeModal } from "./modal.js";

async function loadPartial(id, url) {
  const container = document.getElementById(id);
  if (!container) return;
  const res = await fetch(url);
  const html = await res.text();
  container.innerHTML = html;
}

// Initialize all modules when DOM is loaded
document.addEventListener("DOMContentLoaded", async function () {
  // Set current year in footer
  const currentYearElement = document.getElementById("current-year");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  await loadPartial("header", "./mad-car-arena-partials/header.html");
  await loadPartial("footer", "./mad-car-arena-partials/footer.html");
  if (window.location.pathname.includes("mad-car-arena-contact.html")) {
    await loadPartial(
      "contact-info",
      "./mad-car-arena-partials/contact-info.html"
    );
  }

  // Initialize all modules
  initializeCookieBar();
  initializeMobileMenu();
  initializeDataLoader();
  initializeFormValidation();
  initializeNewsExpander();
  initializeModal();

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add loading animation for buttons
  document
    .querySelectorAll(".btn-primary, .btn-secondary")
    .forEach((button) => {
      button.addEventListener("click", function () {
        if (!this.classList.contains("loading")) {
          this.classList.add("loading");
          setTimeout(() => {
            this.classList.remove("loading");
          }, 1000);
        }
      });
    });

  // Add enhanced hover effects for cards with industrial theme
  document
    .querySelectorAll(
      ".feature-card, .review-card, .contact-card, .news-card, .how-to-item"
    )
    .forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-8px)";
        this.style.boxShadow = "0 15px 35px rgba(255, 107, 53, 0.2)";
      });

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)";
        this.style.boxShadow = "";
      });
    });

  // Add parallax effect for hero section
  const heroSection = document.querySelector(".hero");
  if (heroSection) {
    window.addEventListener("scroll", function () {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      heroSection.style.transform = `translateY(${rate}px)`;
    });
  }

  // Add typing effect for hero title
  const heroTitle = document.getElementById("hero-title");
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = "";
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };
    setTimeout(typeWriter, 500);
  }

  // Add particle effect for industrial theme
  function createParticle() {
    const particle = document.createElement("div");
    particle.style.position = "fixed";
    particle.style.width = "2px";
    particle.style.height = "2px";
    particle.style.backgroundColor = "rgba(255, 107, 53, 0.6)";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "1";
    particle.style.left = Math.random() * window.innerWidth + "px";
    particle.style.top = window.innerHeight + "px";
    particle.style.animation = "particleFall 3s linear forwards";

    document.body.appendChild(particle);

    setTimeout(() => {
      document.body.removeChild(particle);
    }, 3000);
  }

  // Add particle animation CSS
  const style = document.createElement("style");
  style.textContent = `
    @keyframes particleFall {
      0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
      }
      100% {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // Create particles periodically
  setInterval(createParticle, 2000);

  console.log("Mad Car Arena website initialized successfully!");
});
