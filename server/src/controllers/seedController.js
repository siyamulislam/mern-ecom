const data = require("../data");
const { User } = require("../models/userModel");


const seedUser = async (req, res, next) => { 
  try {
    //delete all users
    await User.deleteMany({});
    //insert new users
    const users = await User.insertMany(data.users);

    // success response
    res.status(201).json({users});
  } catch (error) {
    next(error);
  }
}

module.exports = {seedUser};