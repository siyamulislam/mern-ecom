const createError = require("http-errors");
const User = require("../models/userModel");
const { default: mongoose } = require("mongoose");

const findUserById = async (id) => {
    try {
        const options = { password: 0, __v: 0 };
        const user = await User.findById(id, options);

        if (!user) { throw createError(404, 'User not exist!'); }
        return user;
    } catch (errors) {
        if (errors instanceof mongoose.Error) {
            throw createError(400, 'Invalid User id!');
        }
        throw errors;
    }
}
module.exports ={findUserById};