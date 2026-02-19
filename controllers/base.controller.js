const ResourceEnums = require("../constants/resource.enum");
const ClassRoomTable = require("../db/ClassRoomTable");
const TeacherTable = require("../db/TeacherTable");
const StudentTable = require("../db/StudentTable");
const UserTable = require("../db/UserTable");
const asyncHandler = require("../utils/async.handler");

class BaseController {
  resourceDb;
  resourceName;

  constructor(resourceName) {
    this.resourceName = resourceName;
    switch (resourceName) {
      case ResourceEnums.CLASS:
        this.resourceDb = ClassRoomTable;
        break;
      case ResourceEnums.TEACHER:
        this.resourceDb = TeacherTable;
        break;
      case ResourceEnums.STUDENT:
        this.resourceDb = StudentTable;
        break;
      case ResourceEnums.USER:
        this.resourceDb = UserTable;
        break;
      default:
        throw new Error("Invalid resource name");
    }
  }

  list = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const rows = await this.resourceDb.getList(page, limit);
    res.success(rows);
  });

  get = asyncHandler(async (req, res) => {
    const exisitingResource = await this.isResourceExist(req.params.id, res);
    if (exisitingResource) return res.success(exisitingResource);
  });

  delete = asyncHandler(async (req, res) => {
    const exisitingResource = await this.isResourceExist(req.params.id, res);
    if (exisitingResource) {
      await this.resourceDb.delete(req.params.id);
      res.noContent();
    }
  });

  isResourceExist = async (id, res) => {
    const existingResource = await this.resourceDb.getById(id);
    if (!existingResource) {
      return res.notFound(this.resourceName, id);
    }
    return existingResource;
  };
}

module.exports = BaseController;
