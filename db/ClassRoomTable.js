const BaseTable = require("./BaseTable");
const db = require("../lib/db-client");

class ClassRoomTable extends BaseTable {
  constructor() {
    super("classroom", ["name", "teacher_id", "class_type"]);
  }
}

module.exports = new ClassRoomTable();
