const express = require("express");
const passport = require("passport");

// Constants
const UserRoles = require("../consts/roles");

// Services
const AuthService = require("../services/AuthService");
const UserService = require("../services/UserService");

// Middlewares
const { authorize } = require("../middlewares/auth");

const router = express.Router();

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    try {
      const { accessToken, refreshToken } = AuthService.signTokens(req.user);

      return res.status(200).json({
        message: "Authorized",
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    } catch (err) {
      res.status(401).json({
        message: "Authorization failed",
        details: err.message,
      });
    }
  }
);

router.post("/refresh", async (req, res) => {
  const { refresh_token: refreshToken } = req.body;

  try {
    const payload = AuthService.verifyRefreshToken(refreshToken);
    const user = await UserService.getUserById(payload.sub);
    const accessToken = AuthService.signAccessToken(user);

    return res.status(200).json({
      access_token: accessToken,
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: err.message });
  }
});

router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  authorize(UserRoles.USER_ROLE),
  async (req, res) => {
    const { user } = req;

    return res.status(200).json({ user });
  }
);

module.exports = router;
