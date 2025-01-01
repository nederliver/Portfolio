document.addEventListener("DOMContentLoaded", () => {
  /* Mode Switch Functionality */
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
      modeSwitch.setAttribute("aria-pressed", "false");
      modeSwitch.setAttribute("aria-label", "Toggle Dark Mode");
      localStorage.setItem("mode", "dark");
    } else {
      body.classList.add("lightmode");
      modeSwitch.innerText = "Dark Mode";
      modeSwitch.setAttribute("aria-pressed", "true");
      modeSwitch.setAttribute("aria-label", "Toggle Light Mode");
      localStorage.setItem("mode", "light");
    }
  });

  /* Sorting Functionality */
  const sortOptions = document.querySelectorAll('.sort-option');
  const farmsContainer = document.querySelector('.farms-container');
  let farms = Array.from(document.querySelectorAll('.farms-card'));

  // Function to sort farms
  const sortFarms = (sortBy) => {
    if (sortBy === 'alphabet') {
      farms.sort((a, b) => {
        const titleA = a.getAttribute('data-title').toLowerCase();
        const titleB = b.getAttribute('data-title').toLowerCase();
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
      });
    } else if (sortBy === 'difficulty') {
      const difficultyOrder = { 'easy': 1, 'medium': 2, 'hard': 3 };
      farms.sort((a, b) => {
        const diffA = difficultyOrder[a.getAttribute('data-difficulty')];
        const diffB = difficultyOrder[b.getAttribute('data-difficulty')];
        return diffA - diffB;
      });
    }

    // Clear the container and append sorted farms
    farmsContainer.innerHTML = '';
    farms.forEach(farm => farmsContainer.appendChild(farm));
  };

  // Initial sort by alphabet on page load
  sortFarms('alphabet');

  // Set the "Sort by Alphabet" option as active by default
  sortOptions.forEach(option => {
    if (option.getAttribute('data-sort') === 'alphabet') {
      option.classList.add('active-sort');
    } else {
      option.classList.remove('active-sort');
    }
  });

  // Event listeners for sort options
  sortOptions.forEach(option => {
    option.addEventListener('click', () => {
      const sortBy = option.getAttribute('data-sort');

      // Remove active class from all sort options
      sortOptions.forEach(opt => opt.classList.remove('active-sort'));
      // Add active class to the clicked sort option
      option.classList.add('active-sort');

      // Perform the sort
      sortFarms(sortBy);
    });
  });
});