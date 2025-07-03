const toggleBtn = document.getElementById("themeToggle");
const body = document.body;

// Load saved theme from localStorage
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  body.classList.add("dark-mode");
  toggleBtn.textContent = "☀️";
}

// Toggle on click
toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  const isDark = body.classList.contains("dark-mode");

  toggleBtn.textContent = isDark ? "☀️Light mode" : "🌙Dark mode";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
