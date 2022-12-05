const { Strategy, ExtractJwt } = require("passport-jwt");

// Services
const UserService = require("../../../services/UserService");

// Errors
const AuthError = require("../../../errors/auth");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
};

const JwtStrategy = new Strategy(opts, async (payload, done) => {
  const user = await UserService.getUserById(payload.sub);

  if (!user) return done(new AuthError("User not found"), null);

  done(null, user);
});

module.exports = JwtStrategy;
