const ErrorResponse = require("../errors");
const AuthError = require("../errors/auth");

const authorize = (roles = []) => {
  if (typeof roles === "string") {
    roles = [roles];
  }

  return (req, res, next) => {
    try {
      const { role } = req.user;

      if (!roles.includes(role)) {
        return next(new AuthError("User hasn't permission", 403));
      }

      next();
    } catch (err) {
      return next(new ErrorResponse("Unexpected error", 500));
    }
  };
};

module.exports = {
  authorize,
};
