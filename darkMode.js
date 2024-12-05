export default function darkMode(darkModeBtn) {
    if (localStorage.getItem("theme")) {
        document.body.classList.add("active-dark-mode");
    }

    darkModeBtn.addEventListener("click", () => {
        document.body.classList.toggle("active-dark-mode");

        if (document.body.classList.contains("active-dark-mode")) {
            darkModeBtn.innerHTML = `<i class="fa-regular fa-sun"></i>&ensp;Light Mode`;
            localStorage.setItem("theme", "dark");
        } else {
            darkModeBtn.innerHTML = `<i class="fa-regular fa-moon"></i>&ensp;Dark Mode`;
            localStorage.removeItem("theme");
        }
    });
}