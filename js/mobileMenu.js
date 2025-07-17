// Mobile Menu functionality
export function initializeMobileMenu() {
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const header = document.querySelector(".header");

  if (!mobileMenuToggle || !header) return;

  // Create mobile menu structure
  const mobileMenu = document.createElement("div");
  mobileMenu.className = "mobile-menu";
  mobileMenu.innerHTML = `
    <button class="mobile-menu-close" id="mobile-menu-close">&times;</button>
    <ul class="mobile-menu-list">
      <li><a href="./" class="mobile-menu-link">Home</a></li>
      <li><a href="./mad-car-arena-news.html" class="mobile-menu-link">Arena Updates</a></li>
      <li><a href="./mad-car-arena-contact.html" class="mobile-menu-link">Support</a></li>
    </ul>
  `;

  header.appendChild(mobileMenu);

  const mobileMenuClose = document.getElementById("mobile-menu-close");
  const hamburgerLines = document.querySelectorAll(".hamburger-line");

  let isMenuOpen = false;

  function openMenu() {
    isMenuOpen = true;
    mobileMenu.classList.add("show");

    // Animate hamburger to X
    hamburgerLines[0].style.transform = "rotate(45deg) translate(5px, 5px)";
    hamburgerLines[1].style.opacity = "0";
    hamburgerLines[2].style.transform = "rotate(-45deg) translate(7px, -6px)";

    // Prevent body scroll
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    isMenuOpen = false;
    mobileMenu.classList.remove("show");

    // Reset hamburger
    hamburgerLines[0].style.transform = "";
    hamburgerLines[1].style.opacity = "";
    hamburgerLines[2].style.transform = "";

    // Restore body scroll
    document.body.style.overflow = "";
  }

  mobileMenuToggle.addEventListener("click", function () {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileMenuClose.addEventListener("click", closeMenu);

  // Close menu when clicking on a link
  const mobileMenuLinks = mobileMenu.querySelectorAll(".mobile-menu-link");
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (
      isMenuOpen &&
      !mobileMenuToggle.contains(e.target) &&
      !mobileMenu.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // Close menu when pressing Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isMenuOpen) {
      closeMenu();
    }
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768 && isMenuOpen) {
      closeMenu();
    }
  });
}
