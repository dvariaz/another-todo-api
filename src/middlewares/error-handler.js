const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  res.status(error?.payload?.statusCode || 500).json({
    message: error.message || "Server Error",
  });
};

module.exports = errorHandler;
