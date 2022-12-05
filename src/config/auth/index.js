const passport = require("passport");

// Strategies
const LocalStrategy = require("./strategies/local.strategy");
const JwtStrategy = require("./strategies/jwt.strategy");

passport.use(LocalStrategy);
passport.use(JwtStrategy);
