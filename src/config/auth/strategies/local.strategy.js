const { Strategy } = require("passport-local");

// Services
const UserService = require("../../../services/UserService");

// Errors
const AuthError = require("../../../errors/auth");

const opts = {
  usernameField: "email",
};

const LocalStrategy = new Strategy(opts, async (email, password, done) => {
  const user = await UserService.getUserByEmail(email);

  if (!user)
    return done(new AuthError("User not found", { statusCode: 404 }), null);

  const matchResult = await user.matchPassword(password);

  if (!matchResult)
    return done(new AuthError("Wrong credentials", { statusCode: 400 }));

  done(null, user);
});

module.exports = LocalStrategy;
