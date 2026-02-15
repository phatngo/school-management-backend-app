const UserTable = require("../db/UserTable");
const HttpStatus = require("../constants/http-status-code.enum");
const {returnErrorResponse, returnSuccessResponse} = require("../helpers/response.helpers");

exports.createUser = async (req, res) => {
  try {
    const { username, api_key } = req.body;
    const users = await UserTable.getByUsernameAndApiKey(username, api_key);

    if (users.length) {
      return returnErrorResponse(
        res,
        HttpStatus.CONFLICT,
        `User with username: ${username} already exists`,
      );
    }

    const record = await UserTable.create({ username, api_key });
    return returnSuccessResponse(res, HttpStatus.CREATED, {
      success: true,
      data: record,
    });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};
