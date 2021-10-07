const express = require("express");

// Services
const UsersService = require("../services/UsersService");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await UsersService.getUsers();

    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({
      message: "Error consulting users on db.",
      details: err.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UsersService.getUserById(id);

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({
      message: `Error consulting user ${id} on db.`,
      details: err.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  try {
    const oldUser = await UsersService.updateUser(id, payload);

    res.status(200).json({ user: oldUser });
  } catch (err) {
    res.status(500).json({
      message: `Error updating user ${id} on db.`,
      details: err.message,
    });
  }
});

module.exports = router;
