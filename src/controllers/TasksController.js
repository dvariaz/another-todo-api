const express = require("express");

// Services
const TasksService = require("../services/TasksService");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const tasks = await TasksService.getTasks();

    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: `Error trying to get tasks from db.`,
      details: err.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const task = await TasksService.getTaskById(id);

    res.status(200).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: `Error trying to get task ${id} from db.`,
      details: err.message,
    });
  }
});

router.post("/", async (req, res) => {
  const payload = req.body;

  try {
    const task = await TasksService.createTask(payload);

    res.status(200).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: `Error trying to create task on db.`,
      details: err.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  try {
    const task = await TasksService.updateTaskById(id, payload);

    res.status(200).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: `Error trying to update task ${id} on db.`,
      details: err.message,
    });
  }
});

router.patch("/move", async (req, res) => {
  const { task, origin, destination } = req.body;

  try {
    const result = await TasksService.moveTask(task, origin, destination);

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: `Error trying to order a task ${task} from ${origin.task_group} to ${destination.task_group} db.`,
      details: err.message,
    });
  }
});

module.exports = router;
