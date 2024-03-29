const express = require("express");
const passport = require("passport");

// Constants
const UserRoles = require("../consts/roles");

// Middlewares
const { authorize } = require("../middlewares/auth");

// Services
const DashboardsService = require("../services/DashboardsService");

const router = express.Router();

router.use(passport.authenticate("jwt", { session: false }));
router.use(authorize([UserRoles.USER_ROLE]));

router.get("/", async (req, res) => {
  try {
    const involvedUser = req.user._id;
    const dashboards = await DashboardsService.getDashboards({ involvedUser });

    res.status(200).json(dashboards);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error consulting dashboards on db.",
      details: err.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const owner = req.user._id;
    const payload = { ...req.body, owner };

    const dashboard = await DashboardsService.createDashboard(payload);

    res.status(200).json(dashboard);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error trying to create a dashboard on db.",
      details: err.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const dashboard = await DashboardsService.getDashboardById(id);

    res.status(200).json(dashboard);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: `Error consulting dashboard ${id} on db.`,
      details: err.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  try {
    const dashboard = await DashboardsService.updateDashboardById(id, payload);

    res.status(200).json(dashboard);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: `Error trying to update dashboard ${id} on db.`,
      details: err.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDashboard = await DashboardsService.deleteDashboardById(id);

    res.status(200).json({ deleted_dashboard: deletedDashboard });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: `Error deleting dashboard ${id} on db.`,
      details: err.message,
    });
  }
});

router.post("/:id/task-groups", async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  try {
    const taskGroup = await DashboardsService.createTaskGroup(id, payload);

    res.status(200).json(taskGroup);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: `Error creating task group on ${id} dashboard.`,
      details: err.message,
    });
  }
});

router.patch(
  "/:dashboardId/task-groups/:taskGroupId/move",
  async (req, res) => {
    const { dashboardId, taskGroupId } = req.params;
    const { position } = req.body;

    try {
      const updatedTaskGroupsPosition = await DashboardsService.moveTaskGroup(
        dashboardId,
        taskGroupId,
        position
      );

      res.status(200).json(updatedTaskGroupsPosition);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: `Error trying to move task group ${taskGroupId} on dashboard ${dashboardId}.`,
        details: err.message,
      });
    }
  }
);

module.exports = router;
