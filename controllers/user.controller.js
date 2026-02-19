const BaseController = require("./base.controller");
const asyncHandler = require("../utils/async.handler");
const ResourceEnums = require("../constants/resource.enum");

class UserController extends BaseController {
  constructor() {
    super(ResourceEnums.USER);
  }

  create = asyncHandler(async (req, res) => {
    const { username, api_key } = req.body;
    const users = await this.resourceDb.getByUsernameAndApiKey(
      username,
      api_key,
    );

    if (users.length) {
      return res.conflict(ResourceEnums.USER);
    }

    const record = await this.resourceDb.create({ username, api_key });
    return res.created(record);
  });
}

module.exports = new UserController();
