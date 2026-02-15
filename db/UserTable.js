const BaseTable = require("./BaseTable");
const db = require("../lib/db-client");

class UserTable extends BaseTable {
  constructor() {
    super("user", ["username", "api_key"]);
  }

  // Table-specific logic
  async getByUsernameAndApiKey(username, apiKey) {
    const [rows] = await db.execute(
      `SELECT * FROM ${this.tableName} WHERE username = ? AND api_key = ?`,
      [username, apiKey],
    );
    return rows;
  }
}

module.exports = new UserTable();
