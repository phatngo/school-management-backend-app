const returnErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({
    success: false,
    error: message,
  });
};

const returnSuccessResponse = (res, statusCode, json) => {
  return res.status(statusCode).json(json);
};

module.exports.returnErrorResponse = returnErrorResponse;
module.exports.returnSuccessResponse = returnSuccessResponse;