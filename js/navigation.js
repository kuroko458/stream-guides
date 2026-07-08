// ======================================
// Stream Guides Navigation
// ======================================

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {

    menuBtn.addEventListener("click", () => {

        nav.classList.toggle("active");

        menuBtn.textContent =
            nav.classList.contains("active")
            ? "✕"
            : "☰";

    });

}

// Close menu when a link is clicked (mobile)
const navLinks = document.querySelectorAll("#nav a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

        if (menuBtn) {
            menuBtn.textContent = "☰";
        }

    });

});