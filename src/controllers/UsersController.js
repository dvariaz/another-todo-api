const express = require("express");
const passport = require("passport");

// Constants
const UserRoles = require("../consts/roles");

// Middlewares
const { authorize } = require("../middlewares/auth");

// Services
const UserService = require("../services/UserService");

const router = express.Router();

router.use(passport.authenticate("jwt", { session: false }));
router.use(authorize([UserRoles.USER_ROLE]));

router.get("/", async (req, res) => {
  try {
    const users = await UserService.getUsers();

    res.status(200).json(users);
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
    const user = await UserService.getUserById(id);

    res.status(200).json(user);
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
    const oldUser = await UserService.updateUser(id, payload);

    res.status(200).json(oldUser);
  } catch (err) {
    res.status(500).json({
      message: `Error updating user ${id} on db.`,
      details: err.message,
    });
  }
});

module.exports = router;
