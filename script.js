document.addEventListener("DOMContentLoaded", () => {
  const modeSwitch = document.getElementById("mode-switch");
  const body = document.body;

  // Load saved mode from localStorage
  let currentMode = localStorage.getItem("mode") || "dark"; // Default to dark mode
  if (currentMode === "light") {
    body.classList.add("lightmode");
    modeSwitch.innerText = "Dark Mode"; // Set text for light mode
  }

  // Toggle mode on button click
  modeSwitch.addEventListener("click", () => {
    if (body.classList.contains("lightmode")) {
      body.classList.remove("lightmode");
      modeSwitch.innerText = "Light Mode";
      localStorage.setItem("mode", "dark");
    } else {
      body.classList.add("lightmode");
      modeSwitch.innerText = "Dark Mode";
      localStorage.setItem("mode", "light");
    }
  });
});