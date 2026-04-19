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

    console.log({ name, phone_number, class_id });

    const record = await this.resourceDb.create({
      name,
      phone_number: String(phone_number),
      class_id,
    });

    console.log(record);
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
    if (typeof body.name !== "string") {
      res.error("name should be string!");
    }

    if (typeof body.phone_number !== "string") {
      res.error("phone number should be string!");
    }

    if (typeof body.class_id !== "number") {
      res.error("class_id should be number!");
    }

    if (body.length <= 0) {
      res.error("name should not be empty!");
    }

    if (body.phone_number <= 0) {
      res.error("phone number should not be empty!");
    }

    const existingClass = await ClassRoomTable.getById(body.class_id);
    if (!existingClass) {
      res.notFound(ResourceEnums.CLASS, body.class_id);
      return false;
    }
    return true;
  };
}

module.exports = new StudentController();
