const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let count = 0; // Shared counter

// Get the current count
app.get("/api/count", (req, res) => {
  res.json({ count });
});

// Increment the count
app.post("/api/increment", (req, res) => {
  count++;
  res.json({ count });
});

// Start the server
const PORT = 3000; // Use your preferred port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});