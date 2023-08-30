const createError = require("http-errors");
const User = require("../models/userModel");
const { default: mongoose } = require("mongoose");

const findWithId = async (id,options={}) => {
    try {
        const item = await User.findById(id, options);

        if (!item) { throw createError(404, 'Item not exist!'); }
        return item;
    } catch (errors) {
        if (errors instanceof mongoose.Error) {
            throw createError(400, 'Invalid Item id!');
        }
        throw errors;
    }
}
module.exports ={findWithId};