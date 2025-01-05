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

  /* Sorting Functionality */
  const sortButtons = document.querySelectorAll('.sort-option');
  const projectsContainer = document.getElementById('projects-container');

  if (!projectsContainer) {
    console.error('Error: No element found with id "projects-container". Sorting functionality will not work.');
    return; // Exit if projects container is not found
  }

  if (sortButtons.length === 0) {
    console.warn('Warning: No elements found with class "sort-option". Sorting functionality will not work.');
  }

  let projectsData = []; // Will hold fetched projects

  // Function to fetch projects from JSON
  async function fetchProjects() {
    try {
      const response = await fetch('projects.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      projectsData = data.projects;
      renderProjects(projectsData);
      // Apply initial sort based on stored preference
      let currentSort = localStorage.getItem("sort") || "alphabet";
      sortProjects(currentSort);
      updateActiveSortButton(currentSort);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      projectsContainer.innerHTML = '<p>Failed to load projects. Please try again later.</p>';
    }
  }

  // Inside the renderProjects function
  function renderProjects(projects) {
    projectsContainer.innerHTML = ''; // Clear existing projects
    projects.forEach(project => {
      const projectCard = document.createElement('div');
      projectCard.classList.add('projects-card');
      projectCard.setAttribute('data-title', project.title);
      projectCard.setAttribute('data-date', project.date);

      // Determine the title color class
      const titleColorClass = project.titleColor ? `title-${project.titleColor}` : 'title-default';

      // Optional: Determine if this project description should use the new font
      // For example, apply to all or based on specific criteria
      const useNewFont = true; // Set to 'true' to apply to all descriptions, or customize as needed
      const fontClass = useNewFont ? 'description-minibyte-nosimbols' : '';

      // Create category badges if categories exist
      let categoriesHTML = '';
      if (project.categories && project.categories.length > 0) {
        categoriesHTML = project.categories.map(cat => `<span class="project-category">${cat}</span>`).join(' ');
      }

      projectCard.innerHTML = `
        <h3 class="projects-card-title">
          <a href="${project.modrinthLink}" class="${titleColorClass} button-link underline-link" target="_blank" rel="noopener noreferrer">
            ${project.title}
          </a>
        </h3>
        <div class="projects-categories">${categoriesHTML}</div>
        <p class="projects-date">${formatDate(project.date)}</p>
        <p class="projects-description ${fontClass}">${project.description}</p>
      `;

      projectsContainer.appendChild(projectCard);
    });
  }


  // Function to format date from YYYY-MM-DD to "Month Day, Year"
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    // Check for invalid dates
    if (isNaN(date)) {
      console.warn(`Invalid date format: "${dateStr}". Expected "YYYY-MM-DD".`);
      return dateStr; // Return the original string if invalid
    }
    // Options for toLocaleDateString to get "Month Day, Year" format
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  // Function to sort projects
  function sortProjects(sortBy) {
    let sortedProjects = [...projectsData];
    if (sortBy === 'alphabet') {
      sortedProjects.sort((a, b) => a.title.localeCompare(b.title));
      console.log("Projects sorted alphabetically.");
    } else if (sortBy === 'date') {
      sortedProjects.sort((a, b) => new Date(b.date) - new Date(a.date)); // Newest first
      console.log("Projects sorted by date.");
    } else {
      console.warn(`Unknown sort option: "${sortBy}". Sorting aborted.`);
      return;
    }
    renderProjects(sortedProjects);
  }

  // Function to update active sort button
  function updateActiveSortButton(currentSort) {
    sortButtons.forEach(btn => {
      if (btn.getAttribute('data-sort') === currentSort) {
        btn.classList.add('active-sort');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active-sort');
        btn.setAttribute('aria-selected', 'false');
      }
    });
  }

  // Add click handlers to sort buttons
  sortButtons.forEach(button => {
    button.addEventListener('click', () => {
      const sortBy = button.getAttribute('data-sort');
      console.log(`Sort button clicked: ${sortBy}`);

      // Update active state
      sortButtons.forEach(btn => {
        btn.classList.remove('active-sort');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active-sort');
      button.setAttribute('aria-selected', 'true');

      // Save sort preference
      localStorage.setItem("sort", sortBy);

      // Perform sort
      sortProjects(sortBy);
    });
  });

  // Initial fetch and render
  fetchProjects();
});
