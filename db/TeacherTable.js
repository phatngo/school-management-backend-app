const BaseTable = require("./BaseTable");
const db = require("../lib/db-client");

class TeacherTable extends BaseTable {
  constructor() {
    super("teacher", ["name", "department_id"]);
  }
}

module.exports = new TeacherTable();
