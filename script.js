document.addEventListener("DOMContentLoaded", () => {
  /* Mode Switch Functionality */
  const modeSwitchButton = document.getElementById("mode-switch");
  const pageBody = document.body;

  // Function to apply the theme based on currentTheme
  function applyTheme(theme) {
    if (theme === "light") {
      pageBody.classList.add("lightmode");
    } else {
      pageBody.classList.remove("lightmode");
    }

    // If mode switch button exists, update its text and ARIA attributes
    if (modeSwitchButton) {
      if (theme === "light") {
        modeSwitchButton.innerText = "Dark Mode";
        modeSwitchButton.setAttribute("aria-pressed", "true");
        modeSwitchButton.setAttribute("aria-label", "Toggle Dark Mode");
      } else {
        modeSwitchButton.innerText = "Light Mode";
        modeSwitchButton.setAttribute("aria-pressed", "false");
        modeSwitchButton.setAttribute("aria-label", "Toggle Light Mode");
      }
    }
  }

  // Load saved mode from localStorage or default to dark
  let currentTheme = localStorage.getItem("mode") || "dark";
  applyTheme(currentTheme);

  // Toggle theme and save preference
  if (modeSwitchButton) {
    modeSwitchButton.addEventListener("click", () => {
      currentTheme = (currentTheme === "light") ? "dark" : "light";
      localStorage.setItem("mode", currentTheme);
      applyTheme(currentTheme);
      console.log(`Switched to ${currentTheme === "light" ? "Light" : "Dark"} Mode`);
    });
  }
});
