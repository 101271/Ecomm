const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

hamburger.addEventListener("click", () => {
  const isOpen = navLinks.classList.contains("active");

  if (isOpen) {
    navLinks.style.maxHeight = null;
  } else {
    navLinks.style.maxHeight = navLinks.scrollHeight + "px";
  }

  navLinks.classList.toggle("active");
});

dropdownToggles.forEach((toggle) => {
  toggle.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      const dropdown = toggle.nextElementSibling;

      if (dropdown.style.maxHeight) {
        dropdown.style.maxHeight = null;
      } else {
        dropdown.style.maxHeight = dropdown.scrollHeight + "px";
      }

      toggle.parentElement.classList.toggle("open");
    }
  });
});

// Reset on resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navLinks.style.maxHeight = null;
    document.querySelectorAll(".dropdown-menu").forEach((menu) => {
      menu.style.maxHeight = null;
    });
  }
});

    
