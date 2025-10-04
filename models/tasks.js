// models/Task.js
const mongoose = require('mongoose');

// Define the schema (blueprint) for a Task document
const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create and export the Mongoose Model
module.exports = mongoose.model('Tasks', TaskSchema);