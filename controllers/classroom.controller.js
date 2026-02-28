const TeacherTable = require("../db/TeacherTable");
const ResourceEnums = require("../constants/resource.enum");
const { ClassTypesEnums } = require("../constants/class.enum");
const BaseController = require("./base.controller");
const asyncHandler = require("../utils/async.handler");

class ClassRoomController extends BaseController {
  constructor() {
    super(ResourceEnums.CLASS);
  }

  create = asyncHandler(async (req, res) => {
    const { name, teacher_id, class_type } = req.body;

    const isValid = await this.#isValidPayload(req.body, res);
    if (isValid !== true) return;

    const record = await this.resourceDb.create({
      name,
      teacher_id,
      class_type,
    });
    return res.created(record);
  });

  update = asyncHandler(async (req, res) => {
    const { name, teacher_id, class_type } = req.body;

    const exisitingResource = await this.isResourceExist(req.params.id, res);
    if (!exisitingResource) return;

    const isValid = await this.#isValidPayload(req.body, res);
    if (isValid !== true) return;

    const updatedClass = await this.resourceDb.update(req.params.id, {
      name,
      teacher_id,
      class_type,
    });
    return res.success(updatedClass);
  });

  #isValidPayload = async (body, res) => {
    const existingClass = await this.resourceDb.getByMultipleConditions({
      where: { name: body.name },
    });

    if (existingClass) {
      res.conflict(ResourceEnums.CLASS);
      return false;
    }

    const existingTeacher = await TeacherTable.getById(body.teacher_id);
    if (!existingTeacher) {
      res.notFound(ResourceEnums.TEACHER, body.teacher_id);
      return false;
    }

    const existingClassType = Object.values(ClassTypesEnums).includes(
      body.class_type,
    );
    if (!existingClassType) {
      res.error(
        `class should be in [${Object.values(ClassTypesEnums).join(", ")}]`,
      );
      return false;
    }
    return true;
  };
}

module.exports = new ClassRoomController();
