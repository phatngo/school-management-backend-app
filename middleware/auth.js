const UserTable = require("../db/UserTable");

const authenticateBasic = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res.unauthorized();
  }

  try {
    // Decode "username:uuid"
    const base64 = authHeader.split(" ")[1];
    const decoded = Buffer.from(base64, "base64").toString("ascii");
    const [username, apiKey] = decoded.split(":");

    const users = await UserTable.getByUsernameAndApiKey(
      username,
      apiKey,
    );

    if (users.length === 0) {
      return res.unauthorized();
    }

    req.user = users[0];
    next();
  } catch (err) {
    console.log(err);
    res.internalServerError();
  }
};

module.exports = { authenticateBasic };
