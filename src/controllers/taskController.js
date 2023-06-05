const Task = require("../models/Task");

// Create a new task
const createTask = async (req, res) => {
    try {
        const { description } = req.body;
        const task = new Task({ description, owner: req.user._id });
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all tasks for a user
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ owner: req.user._id });
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getTaskById = async (req, res) => {
    const taskId = req.params.id;

    try {
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ task });
    } catch (error) {
        console.error('Error retrieving task:', error);
        res.status(500).json({ message: 'Server error' });
    }
};




// Update a task
const updateTask = async (req, res) => {
    try {
        const { description, completed } = req.body;
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, owner: req.user._id },
            { description, completed },
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).send({ error: "Task not found" });
        }

        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id,
        });

        if (!task) {

            return res.status(404).send({ error: "Task not found" });
        }

        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
};
