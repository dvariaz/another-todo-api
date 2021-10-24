// Models
const DashboardModel = require("../models/Dashboard");
const TaskGroupModel = require("../models/TaskGroup");
const { relocateTaskGroup } = require("../utils/task_groups");

class _DashboardsService {
  async getDashboards({ owner }) {
    const query = owner ? { owner } : {};

    const dashboards = await DashboardModel.find(query).populate([
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
      .populate([
        {
          path: "tasks",
          populate: {
            path: "created_by",
            select: ["name", "profile_photo"],
          },
        },
      ])
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

  async moveTaskGroup(dashboardId, taskGroupId, nextPosition) {
    // Find the affected groups
    const affectedTaskGroups = await TaskGroupModel.find({
      dashboard: dashboardId,
    }).select(["_id", "position"]);

    console.log(affectedTaskGroups);

    const updatedTaskGroups = relocateTaskGroup(
      taskGroupId,
      nextPosition,
      affectedTaskGroups
    );

    // Optimize database calls selecting only the real affected task groups
    const taskGroupsToWrite = updatedTaskGroups.filter(
      (taskGroup) => taskGroup.currentPosition !== taskGroup.nextPosition
    );

    // Update the filtered task groups
    const updateResults = await Promise.all(
      taskGroupsToWrite.map(async (taskGroup) =>
        TaskGroupModel.findByIdAndUpdate(
          taskGroup._id,
          {
            $set: { position: taskGroup.nextPosition },
          },
          { new: true }
        ).select(["_id", "position"])
      )
    );

    return updateResults;
  }
}

module.exports = new _DashboardsService();
