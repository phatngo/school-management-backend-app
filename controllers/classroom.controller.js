const ClassRoomTable = require("../db/ClassRoomTable");
const HttpStatus = require("../constants/http-status-code.enum");

exports.listClasses = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const rows = await ClassRoomTable.getList(page, limit);
    res.status(HttpStatus.OK).json({ page, limit, data: rows });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

exports.createClass = async (req, res) => {
  try {
    const { name, teacher_id, class_type } = req.body;
    const record = await ClassRoomTable.create({ name, teacher_id, class_type });
    res.status(HttpStatus.CREATED).json({ id: record.id });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

exports.updateClass = async (req, res) => {
  try {
    const { name, teacher_id, class_type } = req.body;
    await ClassRoomTable.update(req.params.id, { name, teacher_id, class_type });
    res.status(HttpStatus.OK).json({ message: "Updated" });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

exports.deleteClass = async (req, res) => {
  try {
    await ClassRoomTable.delete(req.params.id);
    res.status(HttpStatus.OK).json({ message: "Deleted" });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

exports.getClassById = async (req, res) => {
  try {
    const cls = await ClassRoomTable.getById(req.params.id);
    if (!cls) return res.status(HttpStatus.NOT_FOUND).json({ message: "Class not found" });
    res.status(HttpStatus.OK).json(cls);
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};
