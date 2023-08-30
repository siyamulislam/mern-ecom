const createError = require("http-errors");
const { default: mongoose } = require("mongoose");

const findWithId = async (Model,id,options={}) => {
    try {
        const item = await Model.findById(id, options);

        if (!item) { throw createError(404, `${Model.modelName} not exist!`); }
        return item;
    } catch (errors) {
        if (errors instanceof mongoose.Error) {
            throw createError(400, `Invalid ${Model.modelName} id!`);
        }
        throw errors;
    }
}
module.exports ={findWithId};