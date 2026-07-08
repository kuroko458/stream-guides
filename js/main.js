// ===============================
// STREAM GUIDES - MAIN.JS
// ===============================

// Mobile Menu
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
        nav.classList.toggle("show");
    });
}

// Close mobile menu after clicking a link
document.querySelectorAll("#nav a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("show");
    });
});

// ===============================
// Dark / Light Mode
// ===============================

const themeBtn = document.getElementById("themeBtn");

function applyTheme(theme) {
    if (theme === "dark") {
        document.body.classList.add("dark");
        if (themeBtn) themeBtn.textContent = "☀️";
    } else {
        document.body.classList.remove("dark");
        if (themeBtn) themeBtn.textContent = "🌙";
    }
}

const savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);

if (themeBtn) {
    themeBtn.addEventListener("click", () => {

        const isDark = document.body.classList.contains("dark");
        const newTheme = isDark ? "light" : "dark";

        localStorage.setItem("theme", newTheme);
        applyTheme(newTheme);

    });
}

// ===============================
// Scroll Animation
// ===============================

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }

    });

}, {
    threshold: 0.15
});

document.querySelectorAll(".card, .platform, .stat").forEach(el => {

    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "0.6s ease";

    observer.observe(el);

});

// ===============================
// Smooth Button Hover Effect
// ===============================

document.querySelectorAll(".btn").forEach(btn => {

    btn.addEventListener("mouseenter", () => {
        btn.style.transform = "scale(1.05)";
    });

    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "scale(1)";
    });

});

// ===============================
// Footer Year
// ===============================

const footer = document.querySelector("footer p");

if (footer) {
    footer.innerHTML = `© ${new Date().getFullYear()} Stream Guides`;
}

// ===============================
// Console Message
// ===============================

console.log("%cWelcome to Stream Guides 🚀", "color:#3b82f6;font-size:20px;font-weight:bold;");
console.log("Website Loaded Successfully.");

// ===============================
// SEARCH UI
// ===============================

function runSearch(value) {

    const box = document.getElementById("searchResults");

    if (!value) {
        box.innerHTML = "";
        return;
    }

    const results = [
        { name: "YouTube OBS Settings", link: "youtube.html" },
        { name: "Twitch OBS Settings", link: "twitch.html" },
        { name: "Kick OBS Settings", link: "kick.html" },
        { name: "Loco OBS Settings", link: "loco.html" },
        { name: "Bitrate Calculator", link: "bitrate-calculator.html" },
        { name: "Earnings Calculator", link: "earnings.html" }
    ].filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase())
    );

    box.innerHTML = results.map(r =>
        `<div style="padding:8px;background:var(--card);margin:5px 0;border-radius:8px;">
            <a href="${r.link}">${r.name}</a>
        </div>`
    ).join("");

}
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
}