const { ResourceEnums } = require("../constants/resource.enum");
const ClassRoomTable = require("../db/ClassRoomTable");
const TeacherTable = require("../db/TeacherTable");
const StudentTable = require("../db/StudentTable");
const UserTable = require("../db/UserTable");

class BaseController {
  resourceDb;
  resourceName;

  constructor(resourceDb, resourceName) {
    this.resourceName = resourceName;
    this.resourceDb = resourceDb;
  }

  list = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const rows = await this.resourceDb.getList(page, limit);
      res.success(rows);
    } catch (err) {
      console.dir(this.resourceDb);
      console.log(err.message);
      res.internalServerError();
    }
  };

  get = async (req, res) => {
    try {
      const exisitingResource = await this.isResourceExist(req.params.id, res);
      if (exisitingResource) return res.success(exisitingResource);
    } catch (err) {
      res.internalServerError();
    }
  };

  delete = async (req, res) => {
    try {
      const exisitingResource = await this.isResourceExist(req.params.id, res);
      if (exisitingResource) {
        await this.resourceDb.delete(req.params.id);
        res.noContent();
      }
    } catch (err) {
      res.internalServerError();
    }
  };

  async isResourceExist(id, res) {
    try {
      const existingResource = await this.resourceDb.getById(id);
      if (!existingResource) {
        return res.notFound(this.resourceName, id);
      }
      return existingResource;
    } catch (err) {
      res.internalServerError();
    }
  }
}

module.exports = BaseController;
