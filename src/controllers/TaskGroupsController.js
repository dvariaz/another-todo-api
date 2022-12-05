const express = require("express");
const passport = require("passport");

// Constants
const UserRoles = require("../consts/roles");

// Middlewares
const { authorize } = require("../middlewares/auth");

// Services
const TaskGroupService = require("../services/TaskGroupService");
const TaskService = require("../services/TaskService");

const router = express.Router();

router.use(passport.authenticate("jwt", { session: false }));
router.use(authorize([UserRoles.USER_ROLE]));

router.get("/", async (req, res) => {
  try {
    const taskGroups = await TaskGroupService.getTaskGroups();

    res.status(200).json(taskGroups);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: `Error trying to create a task inside group ${taskGroupId}.`,
      details: err.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const taskGroups = await TaskGroupService.getTaskGroupById(id);

    res.status(200).json(taskGroups);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: `Error trying to create a task inside group ${taskGroupId}.`,
      details: err.message,
    });
  }
});

router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, created_by, position } = req.body;

  //TODO: Author can be extracted from auth headers

  try {
    const createdTask = await TaskGroupService.createTaskInTaskGroup(
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

router.delete("/:taskGroupId/task/:taskId", async (req, res) => {
  const { taskGroupId, taskId } = req.params;

  try {
    const updatedTaskGroup = await TaskGroupService.deleteTaskInTaskGroup(
      taskGroupId,
      taskId
    );
    const deletedTask = await TaskService.deleteTaskById(taskId);

    return res.status(200).json({
      updatedTaskGroup,
      deletedTask,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: `Error trying to delete a task ${id} on db.`,
      details: err.message,
    });
  }
});

module.exports = router;
