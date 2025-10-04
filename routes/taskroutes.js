// routes/taskRoutes.js
const express = require('express');
const Task = require('../models/tasks'); // Import the Task model
const router = express.Router();

// 1. CREATE (POST /api/tasks)
router.post('/', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task); // 201 Created
  } catch (error) {
    res.status(400).json({ message: error.message }); // 400 Bad Request for validation errors
  }
});

// 2. READ All (GET /api/tasks)
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks); // 200 OK
  } catch (error) {
    res.status(500).json({ message: error.message }); // 500 Internal Server Error
  }
});

// 2. READ One (GET /api/tasks/:id)
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' }); // 404 Not Found
    res.status(200).json(task);
  } catch (error) {
    // This catches invalid ObjectId format or server errors
    res.status(500).json({ message: error.message });
  }
});

// 3. UPDATE (PUT /api/tasks/:id)
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // { new: true } returns the updated document
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message }); // Validation/Bad Request error
  }
});

// 4. DELETE (DELETE /api/tasks/:id)
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;