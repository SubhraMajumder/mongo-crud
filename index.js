const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // To parse JSON bodies
app.use(cors()); // Enable CORS

// ⚠️ IMPORTANT: Vercel functions should typically export the app, not listen on a port.
// We'll use this structure for local testing and later export the app for Vercel.

// Connect to MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Simple API Route
app.get("/api/status", (req, res) => {
  res.json({ message: "API is running successfully!" });
});

// **For Vercel Deployment:** Export the app instance
// Remove or comment out the app.listen() part for Vercel.
module.exports = app;

/*
// For Local Testing ONLY:
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
*/