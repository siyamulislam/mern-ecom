const createHttpError = require("http-errors");
const User = require("../models/userModel");
const { successResponse } = require("./responseController");


const getUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 3;
    const searchRegExp = RegExp('.*' + search + '.*', 'i');
    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
        { phone: { $regex: searchRegExp } },
      ],
    };
    const options = { password: 0, __v: 0 };
    const users = await User.find(filter, options).limit(limit).skip((page - 1) * limit);
    const userCount = await User.find(filter).countDocuments();

    if (!users || userCount === 0) throw createHttpError(404, "no user found!");
   
    return successResponse(res, {
      statusCode: 200,
      message: `${userCount} users successfully fetched`,
      payload: {
        pagination: {
          totalPages: Math.ceil(userCount / limit),
          currentPage: page,
          prevPage: page > 1 ? page - 1 : null,
          nextPage: page < Math.ceil(userCount / limit) ? page + 1 : null,
        },
        users: users,
      },
    })
  } catch (error) {
    next(error);
  }
}

module.exports = { getUsers };