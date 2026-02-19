const ResourceEnums = require("../constants/resource.enum");
const BaseController = require("./base.controller");
const asyncHandler = require("../utils/async.handler");

class TeacherController extends BaseController {
  constructor() {
    super(ResourceEnums.TEACHER);
  }

  create = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const record = await this.resourceDb.create({ name });

    res.created(record);
  });

  update = asyncHandler(async (req, res) => {
    const isExistingResource = await this.isResourceExist(req.params.id, res);
    if (!isExistingResource) return;

    const { name } = req.body;
    const updatedRecord = await this.resourceDb.update(req.params.id, {
      name,
    });
    res.success(updatedRecord);
  });
}

module.exports = new TeacherController();
