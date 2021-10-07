const { ENVIRONMENT } = process.env;

const allowedEnvironments = (...environments) => {
  return (req, res, next) => {
    if (!environments.includes(ENVIRONMENT)) {
      return res.status(403).json({
        message: `This operation is not allowed for current environment ${ENVIRONMENT}`,
      });
    }
    next();
  };
};

const forbiddenEnvironments = (...environments) => {
  return (req, res, next) => {
    if (environments.includes(ENVIRONMENT)) {
      return res.status(403).json({
        message: `This operation is not allowed for current environment ${ENVIRONMENT}`,
      });
    }
    next();
  };
};

module.exports = {
  allowedEnvironments,
  forbiddenEnvironments,
};
