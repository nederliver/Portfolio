// load-header.js
document.addEventListener("DOMContentLoaded", () => {
    fetch('header.html')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;
        initializeModeSwitch(); // Initialize mode switch functionality after loading header
      })
      .catch(error => {
        console.error('Error loading header:', error);
      });
  });
  
  // Function to initialize the Mode Switch functionality
  function initializeModeSwitch() {
    const modeSwitch = document.getElementById("mode-switch");
    const body = document.body;
  
    // Load saved mode from localStorage
    let currentMode = localStorage.getItem("mode") || "dark"; // Default to dark mode
    if (currentMode === "light") {
      body.classList.add("lightmode");
      modeSwitch.innerText = "Dark Mode"; // Set text for light mode
    } else {
      modeSwitch.innerText = "Light Mode"; // Set text for dark mode
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
  }