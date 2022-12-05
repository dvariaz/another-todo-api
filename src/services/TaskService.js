// Models
const TaskModel = require("../models/Task");
const TaskGroupModel = require("../models/TaskGroup");

class _TaskService {
  async getTasks() {
    const tasks = await TaskModel.find();

    return tasks;
  }

  async createTask(payload) {
    const task = await TaskModel.create(payload);

    return task;
  }

  async getTaskById(id) {
    const task = await TaskModel.findById(id);

    return task;
  }

  async updateTaskById(id, payload) {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      {
        $set: payload,
      },
      { new: true }
    ).lean();

    return updatedTask;
  }

  async deleteTaskById(id) {
    const deletedTask = await TaskModel.findByIdAndDelete(id);

    return deletedTask;
  }

  async moveTask(task, origin, destination) {
    // We remove the task from the original task group
    const originTaskGroup = await TaskGroupModel.findByIdAndUpdate(
      origin.task_group,
      { $pull: { tasks: task } },
      { new: true }
    ).lean();

    // We updated the destination task group
    const destinationTaskGroup = await TaskGroupModel.findByIdAndUpdate(
      destination.task_group,
      {
        $push: {
          tasks: {
            $each: [task],
            $position: destination.position,
          },
        },
      },
      { new: true }
    ).lean();

    return { origin: originTaskGroup, destination: destinationTaskGroup };
  }
}

module.exports = new _TaskService();
