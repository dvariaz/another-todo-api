const express = require("express");

// Services
const TaskGroupsService = require("../services/TaskGroupsService");

const router = express.Router();

router.get('/', async(req, res) => {
  try {
    const taskGroups = await TaskGroupsService.getTaskGroups();

    res.status(200).json(taskGroups);
  } catch(err) {
    console.error(err);
    res.status(500).json({
      message: `Error trying to create a task inside group ${taskGroupId}.`,
      details: err.message,
    });
  }
})

router.get('/:id', async(req, res) => {
  const {id} = req.params;

  try {
    const taskGroups = await TaskGroupsService.getTaskGroupById(id);

    res.status(200).json(taskGroups);
  } catch(err) {
    console.error(err);
    res.status(500).json({
      message: `Error trying to create a task inside group ${taskGroupId}.`,
      details: err.message,
    });
  }
})

router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, created_by, position } = req.body;

  //TODO: Author can be extracted from auth headers

  try {
    const createdTask = await TaskGroupsService.createTaskInTaskGroup(
      id,
      { title, description, created_by },
      position
    );

    res.status(200).json(createdTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: `Error trying to create a task inside group ${id}.`,
      details: err.message,
    });
  }
});

module.exports = router;