const TeacherTable = require("../db/TeacherTable");
const HttpStatus = require("../constants/http-status-code.enum");

exports.listTeachers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const rows = await TeacherTable.getList(page, limit);

    res.status(HttpStatus.OK).json({ page, limit, data: rows });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

exports.createTeacher = async (req, res) => {
  try {
    const { name, department_id } = req.body;
    const record = await TeacherTable.create({ name, department_id });
    res.status(HttpStatus.CREATED).json({ id: record.id });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

exports.updateTeacher = async (req, res) => {
  try {
    const { name, department_id } = req.body;
    await TeacherTable.update(req.params.id, { name, department_id });
    res.status(HttpStatus.OK).json({ message: "Updated" });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    await TeacherTable.delete(req.params.id);
    res.status(HttpStatus.OK).json({ message: "Deleted" });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await TeacherTable.getById(req.params.id);
    if (!teacher)
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: "Teacher not found" });
    res.status(HttpStatus.OK).json(teacher);
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};
