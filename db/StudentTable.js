const BaseTable = require("./BaseTable");
const db = require("../lib/db-client");

class StudentTable extends BaseTable {
  constructor() {
    super("students", ["name", "phone_number", "class_id"]);
  }

  // Table-specific logic
  async getByClass(classId) {
    const [rows] = await db.execute(
      `SELECT * FROM students WHERE class_id = ?`,
      [classId],
    );
    return rows;
  }
}

module.exports = new StudentTable();
