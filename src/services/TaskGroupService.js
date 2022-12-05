// Models
const TaskGroupModel = require("../models/TaskGroup");

// Services
const TaskService = require("./TaskService");

class _TaskGroupService {
  async getTaskGroups() {
    const taskGroups = await TaskGroupModel.find({});

    return taskGroups;
  }

  async getTaskGroupById(taskGroupId) {
    const taskGroup = await TaskGroupModel.findById(taskGroupId);

    return taskGroup;
  }

  async createTaskInTaskGroup(taskGroupId, task, position) {
    const createdTask = await TaskService.createTask(task);

    await TaskGroupModel.findByIdAndUpdate(taskGroupId, {
      $push: {
        tasks: {
          $each: [createdTask._id],
          $position: position,
        },
      },
    });

    return createdTask;
  }

  async deleteTaskInTaskGroup(taskGroupId, taskId) {
    const updatedTaskGroup = await TaskGroupModel.findByIdAndUpdate(
      taskGroupId,
      {
        $pull: {
          tasks: taskId,
        },
      },
      { new: true }
    );

    return updatedTaskGroup;
  }
}

module.exports = new _TaskGroupService();
