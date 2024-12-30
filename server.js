const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the root directory (no public folder)
app.use(express.static(path.join(__dirname)));

// Explicitly serve the index.html for the root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// API to get the current count
let count = 0; // Shared counter
app.get("/api/count", (req, res) => {
  res.json({ count });
});

// API to increment the count
app.post("/api/increment", (req, res) => {
  count++;
  res.json({ count });
});

// Catch-all route to redirect to index.html for unmatched routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});