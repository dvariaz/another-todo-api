// Models
const DashboardModel = require("../models/Dashboard");
const TaskGroupModel = require("../models/TaskGroup");

class _DashboardsService {
  async getDashboards() {
    const dashboards = await DashboardModel.find().populate([
      {
        path: "shared_users",
        select: ["name", "email", "role", "profile_photo"],
      },
      {
        path: "owner",
        select: ["name", "email", "role", "profile_photo"],
      },
    ]);

    return dashboards;
  }

  async createDashboard(payload) {
    const dashboard = await DashboardModel.create(payload);

    return dashboard.populate([
      {
        path: "shared_users",
        select: ["name", "email", "role", "profile_photo"],
      },
      {
        path: "owner",
        select: ["name", "email", "role", "profile_photo"],
      },
    ]);
  }

  async getDashboardById(id) {
    const dashboard = await DashboardModel.findById(id)
      .populate([
        {
          path: "shared_users",
          select: ["name", "email", "role", "profile_photo"],
        },
        {
          path: "owner",
          select: ["name", "email", "role", "profile_photo"],
        },
      ])
      .lean();

    const taskGroups = await TaskGroupModel.find({ dashboard: id })
      .sort("position")
      .populate({
        path: "tasks",
      })
      .lean();

    return { ...dashboard, task_groups: taskGroups };
  }

  async updateDashboardById(id, payload) {
    const updatedDashboard = await DashboardModel.findByIdAndUpdate(
      id,
      {
        $set: payload,
      },
      { new: true }
    )
      .populate([
        {
          path: "shared_users",
          select: ["name", "email", "role", "profile_photo"],
        },
        {
          path: "owner",
          select: ["name", "email", "role", "profile_photo"],
        },
      ])
      .lean();

    return updatedDashboard;
  }

  async deleteDashboardById(id) {
    const deleted = await DashboardModel.findByIdAndDelete(id);

    return deleted;
  }

  async createTaskGroup(dashboardId, payload) {
    const taskGroup = await TaskGroupModel.create({
      ...payload,
      dashboard: dashboardId,
    });

    return taskGroup;
  }

  async moveTaskGroup() {
    //TODO: Order the other documents
  }
}

module.exports = new _DashboardsService();
