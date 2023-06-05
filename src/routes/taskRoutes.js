const express = require("express");
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Create a new task route
router.post("/tasks", authMiddleware, taskController.createTask);

// Get all tasks route
router.get("/tasks", authMiddleware, taskController.getTasks);

// GET /tasks/:id
router.get('/tasks/:id', authMiddleware, taskController.getTaskById);

// Update a task route
router.patch("/tasks/:id", authMiddleware, taskController.updateTask);

// Delete a task route
router.delete("/tasks/:id", authMiddleware, taskController.deleteTask);

module.exports = router;
