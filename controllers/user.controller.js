const UserTable = require("../db/UserTable");
const HttpStatus = require("../constants/http-status-code.enum");

exports.createUser = async (req, res) => {
  try {
    const { username, api_key } = req.body;
    const record = await UserTable.create({ username, api_key });
    res.status(HttpStatus.CREATED).json({ id: record.id });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};
