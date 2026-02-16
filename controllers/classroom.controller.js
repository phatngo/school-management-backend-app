const ClassRoomTable = require("../db/ClassRoomTable");
const TeacherTable = require("../db/TeacherTable");
const {
  HttpStatus,
  HttpStatusCode,
} = require("../constants/http-status-code.enum");
const { ResourceEnums } = require("../constants/resource.enum");
const { ClassTypesEnums } = require("../constants/class.enum");

exports.listClasses = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const rows = await ClassRoomTable.getList(page, limit);
    res.success(rows);
  } catch (err) {
    res.internalServerError();
  }
};

exports.createClass = async (req, res) => {
  try {
    const { name, teacher_id, class_type } = req.body;

    const isValid = await isValidPayload(req.body, res);
    if (isValid !== true) return;

    const record = await ClassRoomTable.create({
      name,
      teacher_id,
      class_type,
    });
    return res.created(record);
  } catch (err) {
    res.internalServerError();

  }
};

exports.updateClass = async (req, res) => {
  try {
    const { name, teacher_id, class_type } = req.body;

    const isExisting = await isResourceExist(req.params.id, res);
    if (isExisting !== true) return;

    const isValid = await isValidPayload(req.body, res);
    if (isValid !== true) return;

    const updatedClass = await ClassRoomTable.update(req.params.id, {
      name,
      teacher_id,
      class_type,
    });
    return res.success(updatedClass);
  } catch (err) {
    console.log(err.message);
    res.internalServerError();
  }
};

exports.deleteClass = async (req, res) => {
  try {
    const isExisting = await isResourceExist(req.params.id, res);
    if (isExisting !== true) return;

    await ClassRoomTable.delete(req.params.id);
    res.noContent();
  } catch (err) {
    res.internalServerError();
  }
};

exports.getClassById = async (req, res) => {
  try {
    const isExisting = await isResourceExist(req.params.id, res);
    if (isExisting !== true) return;

    const cls = await ClassRoomTable.getById(req.params.id);
    res.success(cls);
  } catch (err) {
    res.internalServerError();
  }
};

async function isValidPayload(body, res) {
  const existingClass = await ClassRoomTable.getByMultipleConditions({
    where: { name: body.name },
  });

  if (existingClass) {
    return res.conflict(ResourceEnums.CLASS);
  }

  const existingTeacher = await TeacherTable.getById(body.teacher_id);
  if (!existingTeacher) {
    return res.notFound(ResourceEnums.TEACHER, body.teacher_id);
  }

  const existingClassType = Object.values(ClassTypesEnums).includes(
    body.class_type,
  );
  if (!existingClassType) {
    return res.error(
      `class should be in [${Object.values(ClassTypesEnums).join(", ")}]`,
    );
  }
  return true;
}

async function isResourceExist(id, res) {
  const existingClass = await ClassRoomTable.getById(id);
  if (!existingClass) {
    return res.notFound(ResourceEnums.CLASS, id);
  }
  return true;
}
