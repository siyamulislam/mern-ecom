const createError = require("http-errors");
const fs = require("fs");

const User = require("../models/userModel");
const { successResponse } = require("./responseController");
const { default: mongoose } = require("mongoose");
const { findWithId } = require("../services/findItem");
const { defaultImagePath } = require("../secret");


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
    const options = { password: 0, __v: 0 };

    const user = await findWithId(id, options);
    return successResponse(res, {
      statusCode: 200,
      message: `${id} user successfully found!`,
      payload: { user }

    })
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(createError(400, 'Invalid User id!'));
      return;
    }
    next(error);
  }
}
const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0, __v: 0 };
    const user = await findWithId(id, options);
    const deletedUser = await User.findByIdAndDelete({ _id: id, isAdmin: false });
    const userImagePath = deletedUser.image;
    fs.access(userImagePath, (err) => {
      if (err) { console.error('User image dose not exist!'); }
      if (userImagePath === defaultImagePath) { return; }
      else {
        fs.unlink(userImagePath, (err) => {
          if (err) throw err;
          console.log('User Image Successfully Deleted');
        });
      }
    });
    if (user) {

    }
    return successResponse(res, {
      statusCode: 200,
      message: `${id} user successfully deleted!`,
      payload: { deleteUser }

    })
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(createError(400, 'Invalid User id!'));
      return;
    }
    next(error);
  }
}

module.exports = { getUsers, getUser, deleteUser };