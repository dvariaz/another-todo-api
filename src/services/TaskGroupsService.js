// Models
const TaskGroupModel = require("../models/TaskGroup");

class _TaskGroupsService {
  async getTaskGroups(){
    const taskGroups = await TaskGroupModel.find({})

    return taskGroups;
  }

  async getTaskGroupById(taskGroupId){
    const taskGroup = await TaskGroupModel.findById(taskGroupId);

    return taskGroup;
  }

  async createTaskInTaskGroup(taskGroupId, task, position) {
    const createdTask = await TasksService.createTask(task);

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
}

module.exports = new _TaskGroupsService();