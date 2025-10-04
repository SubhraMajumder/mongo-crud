const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const taskRoutes = require('./routes/taskroutes'); // <-- Import new routes

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // To parse JSON bodies
app.use(cors()); 

// Connect to MongoDB Atlas (connection logic remains the same)
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Use the new Task routes with a base path of /api/tasks
// All routes in taskRoutes.js will be prefixed with /api/tasks
app.use('/api/tasks', taskRoutes);

// Simple API Status Route (optional)
app.get("/api/status", (req, res) => {
  res.json({ message: "API is running successfully!" });
});

module.exports = app;
// Remove app.listen() if deploying to Vercel