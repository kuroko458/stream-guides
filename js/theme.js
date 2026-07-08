// ======================================
// Stream Guides Theme System
// ======================================

const themeBtn = document.getElementById("themeBtn");

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
    document.body.classList.add(savedTheme);

    if (themeBtn) {
        themeBtn.textContent =
            savedTheme === "light-mode" ? "☀️" : "🌙";
    }
}

if (themeBtn) {

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");

        const light =
            document.body.classList.contains("light-mode");

        localStorage.setItem(
            "theme",
            light ? "light-mode" : ""
        );

        themeBtn.textContent =
            light ? "☀️" : "🌙";

    });

}