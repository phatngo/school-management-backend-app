const asyncHandler = (callback) => {
  return async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (err) {
      console.error(err); // Log for the developer
      // Use your existing helper from the middleware
      res.internalServerError(err.message);
    }
  };
};

module.exports = asyncHandler;
