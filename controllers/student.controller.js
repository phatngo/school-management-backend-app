const ResourceEnums = require("../constants/resource.enum");
const ClassRoomTable = require("../db/ClassRoomTable");
const BaseController = require("./base.controller");
const asyncHandler = require("../utils/async.handler");

class StudentController extends BaseController {
  constructor() {
    super(ResourceEnums.STUDENT);
  }
  create = asyncHandler(async (req, res) => {
    const { name, phone_number, class_id } = req.body;
    const isValid = await this.#isValidPayload(req.body, res);
    if (!isValid) return;

    const record = await this.resourceDb.create({
      name,
      phone_number,
      class_id,
    });

    res.created(record);
  });

  update = asyncHandler(async (req, res) => {
    const isExistingResource = await this.isResourceExist(req.params.id, res);
    if (!isExistingResource) return;

    const isValid = await this.#isValidPayload(req.body, res);
    if (!isValid) return;

    const { name, phone_number, class_id } = req.body;
    const updatedRecord = await this.resourceDb.update(req.params.id, {
      name,
      phone_number,
      class_id,
    });
    res.success(updatedRecord);
  });

  #isValidPayload = async (body, res) => {
    const existingClass = await ClassRoomTable.getById(body.class_id);
    if (!existingClass) {
      return res.notFound(ResourceEnums.CLASS, body.class_id);
    }
    return true;
  };
}

module.exports = new StudentController();
