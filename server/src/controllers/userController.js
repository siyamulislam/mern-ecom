const createError = require("http-errors");
const User = require("../models/userModel");
const { successResponse } = require("./responseController");
const { default: mongoose } = require("mongoose");
const { findUserById } = require("../services/findUser");


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
    console.log(users)
    if (!users || userCount === 0) throw createError(404, "no user found!");

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
const getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await findUserById(id);
    return successResponse(res, {
      statusCode: 200,
      message: `${id} user successfully found!`,
      payload: {user}

    })
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(createError(400, 'Invalid User id!'));
      return;
    }
    next(error);
  }
}

module.exports = { getUsers, getUser };