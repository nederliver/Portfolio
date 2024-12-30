const API_URL = "https://portfolio-yoar.onrender.com";

const countElement = document.getElementById("count");
const incrementButton = document.getElementById("increment-btn");

let canClick = true;

// Fetch the current count from the server
async function fetchCount() {
  try {
    const response = await fetch(`${API_URL}/api/count`);
    const data = await response.json();
    countElement.innerText = data.count;
  } catch (error) {
    console.error("Failed to fetch count:", error);
  }
}

// Send increment request to the server
async function incrementCount() {
  if (!canClick) return;

  // Disable further clicks for a short duration (e.g., 500ms)
  canClick = false;
  setTimeout(() => {
    canClick = true;
  }, 500);

  try {
    const response = await fetch(`${API_URL}/api/increment`, {
      method: "POST",
    });
    const data = await response.json();
    countElement.innerText = data.count;
  } catch (error) {
    console.error("Failed to increment count:", error);
  }
}

// Fetch the current count on page load
fetchCount();

// Increment count on button click
incrementButton.addEventListener("click", incrementCount);