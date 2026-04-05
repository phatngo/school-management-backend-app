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
    let numPage;
    let numLimit;

    if (!req.query.page) {
      numPage = 1;
    } else {
      numPage = parseInt(req.query.page);
      if (isNaN(numPage) || numPage <= 0) {
        return res.error(
          "Invalid page number! Page must be a positive integer.",
        );
      }
    }

    if (!req.query.limit) {
      numLimit = 10;
    } else {
      numLimit = parseInt(req.query.limit);
      if (isNaN(numLimit) || numLimit <= 0) {
        return res.error("Invalid limit! Limit must be a positive integer.");
      }
    }

    const [rows, total] = await Promise.all([
      this.resourceDb.getList(numPage, numLimit),
      this.resourceDb.getCount(),
    ]);
    const offset = (numPage - 1) * numLimit;
    const from = total === 0 ? 0 : offset + 1;
    const to = offset + rows.length;
    const previous_page = numPage > 1 ? numPage - 1 : null;
    const next_page = to < total ? numPage + 1 : null;
    res.paginatedSuccess({ rows, from, to, previous_page, next_page, total });
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
