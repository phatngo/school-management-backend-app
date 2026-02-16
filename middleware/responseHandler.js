const {
  HttpStatus,
  HttpStatusCode,
} = require("../constants/http-status-code.enum");

module.exports = (req, res, next) => {
  // 1. Success helper (2xx except 204)
  res.success = (data, code = HttpStatus.OK, status = HttpStatusCode.OK) => {
    return res.status(status).json({
      code: code,
      data: data,
    });
  };

  // 2. Created helper (Specific for 201)
  res.created = (data) => {
    return res.status(HttpStatusCode.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
    });
  };

  // 3. No Content helper (204)
  res.noContent = () => {
    return res.status(HttpStatusCode.NO_CONTENT).send();
  };

  // 4. Error helper (4xx, 5xx)
  res.error = (
    message,
    code = HttpStatus.BAD_REQUEST,
    status = HttpStatusCode.BAD_REQUEST,
  ) => {
    return res.status(status).json({
      code: code,
      error: message,
    });
  };

  res.unauthorized = () => {
    res.error(
      `Authorization failed`,
      HttpStatus.UNAUTHORIZED,
      HttpStatusCode.UNAUTHORIZED,
    )
  };

  res.notFound = (resourceName, id) => {
    res.error(
      `${resourceName} with ID: ${id} is not found`,
      HttpStatus.NOT_FOUND,
      HttpStatusCode.NOT_FOUND,
    );
  };

  res.conflict = (resourceName) => {
    res.error(
      `Duplicate ${resourceName}`,
      HttpStatus.CONFLICT,
      HttpStatusCode.CONFLICT,
    );
  };

  res.internalServerError = () => {
    res.error(
      `Something went wrong on the server`,
      HttpStatus.INTERNAL_SERVER_ERROR,
      HttpStatusCode.INTERNAL_SERVER_ERROR,
    )
  };
  next();
};
