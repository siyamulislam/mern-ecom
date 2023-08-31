const createError = require("http-errors");
const jwt = require('jsonwebtoken');

const User = require("../models/userModel");
const { successResponse } = require("./responseController");
const { default: mongoose } = require("mongoose");
const { findWithId } = require("../services/findItem");
const { defaultImagePath, jwtActivationKey, clientURL, serverURL } = require("../secret");
const { deleteImage } = require("../helper/deleteImage");
const { createJSONWebToken } = require("../helper/jwt");
const sendEmailWithNodeMailer = require("../helper/sendEmail");


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
const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0, __v: 0 };

    const user = await findWithId(User, id, options);
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

const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0, __v: 0 };
    const user = await findWithId(User, id, options);
    const userImagePath = user.image;
    await User.findByIdAndDelete({ _id: id, isAdmin: false });

    if (userImagePath !== defaultImagePath) {
      deleteImage(userImagePath);
    }

    return successResponse(res, {
      statusCode: 200,
      message: `${id} user successfully deleted!`,
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
const processRegister = async (req, res, next) => {
  try {
    const { name, email, password, phone, address } = req.body;
    // console.log(email);
    // return;
    const userExists = await User.exists({ email: email });
    if (userExists) throw createError(409, `${email} email already exist! please try login...`);
    // create jwt token
    const token = createJSONWebToken({ name, email, password, phone, address }, jwtActivationKey, '24h')

    // create email
    const emailData = {
      email,
      subject: 'EcomApp Account Activation Email',
      html: ` 
        <h2>Welcome, ${name}!</h2>
        <p>Please click here to 
        <a href="${serverURL}/api/users/activate?token=${token}" target="_blank">activate your account</a>
        </p>
      `
    }
    // send mail with nodemailer
    
    // try {
    //   await sendEmailWithNodeMailer(emailData);
    // } catch (error) {
    //   next(createError(500, 'failed to send verification email'));
    //   return;
    // }
    return successResponse(res, {
      statusCode: 200,
      message: `Please check your email:${email} to for complete your registrations!`,
      payload: { token }
    })
  } catch (error) {
    next(error);
  }
}
const activateUserAccount = async (req, res, next) => {
  try {
    const token = req.body.token; 
    if (!token) throw createError(404, 'token not found!');
    try {
      const decoded = jwt.verify(token, jwtActivationKey);
      if (!decoded) throw createError(401, 'Unable to verify user by!')
      decoded.isVerified = true;
      console.log(decoded)

      const userExists = await User.exists({ email: decoded.email });
      if (userExists) throw createError(409, `User ${decoded.email} email already exist and verified! please login and chill...`);
      await User.create(decoded);
      return successResponse(res, {
        statusCode: 201,
        message: `User is successfully verified & registered!`,
      })
    } catch (error) {
      if (error.name === 'TokenExpiredError') throw createError(401, 'Token has expired!');
      else if (error.name === 'JsonWebTokenError') throw createError(401, 'Invalid token!');
      else throw error;
    }



  } catch (error) {

    next(error);
  }
} 
const activateUser = async (req, res, next) => {
  try {
    const token = req.query.token ;

    if (!token) throw createError(404, 'token not found!');
    try {
      const decoded = jwt.verify(token, jwtActivationKey);
      if (!decoded) throw createError(401, 'Unable to verify user by!')
      decoded.isVerified = true;
      console.log(decoded)

      const userExists = await User.exists({ email: decoded.email });
      if (userExists) throw createError(409, `User ${decoded.email} email already exist and verified! please login and chill...`);
      await User.create(decoded);
      return successResponse(res, {
        statusCode: 201,
        message: `User is successfully verified & registered!`,
      })
    } catch (error) {
      if (error.name === 'TokenExpiredError') throw createError(401, 'Token has expired!');
      else if (error.name === 'JsonWebTokenError') throw createError(401, 'Invalid token!');
      else throw error;
    }



  } catch (error) {

    next(error);
  }
} 
module.exports = { activateUser,activateUserAccount, processRegister, getUsers, getUserById, deleteUserById };