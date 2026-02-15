const StudentTable = require("../db/StudentTable");
const HttpStatus = require("../constants/http-status-code.enum");

exports.listStudents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const rows = await StudentTable.getList(page, limit);
    res.status(HttpStatus.OK).json({ page, limit, data: rows });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const { name, phone_number, class_id } = req.body;
    const record = await StudentTable.create({ name, phone_number, class_id });
    res.status(HttpStatus.CREATED).json({ id: record.id });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const { name, phone_number, class_id } = req.body;
    await StudentTable.update(req.params.id, { name, phone_number, class_id });
    res.status(HttpStatus.OK).json({ message: "Updated" });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    await StudentTable.delete(req.params.id);
    res.status(HttpStatus.OK).json({ message: "Deleted" });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await StudentTable.getById(req.params.id);
    if (!student) return res.status(HttpStatus.NOT_FOUND).json({ message: "Student not found" });
    res.status(HttpStatus.OK).json(student);
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};
