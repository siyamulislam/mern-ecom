const { Schema,model } = require("mongoose");
const bcrypt = require('bcryptjs');
const { defaultImagePath } = require("../secret");

const userSchema = new Schema({
    name: {
        type: String,
        require: [true, 'User name is require'],
        trim: true,
        minlength: [4, 'The length of user min 4 char'],
        maxlength: [40, 'The length of user min 40 char'],
    },
    email: {
        type: String,
        require: [true, 'User email is required'],
        trim: true,
        unique:true,
        lowercase:true,
        validate:{
            validator:  (v) =>{
                return /^\w+([\.−]?\w+)*@\w+([\.−]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: 'Please enter a valid email'
        },
    },
    password: {
        type: String,
        require: [true, 'User password is required'], 
        minlength: [6, 'The length of password min 6 char'],
        set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(12)),
    },
    image: {
        type: Buffer, 
        contentType: String
        // default:defaultImagePath,
    },
    phone: {
        type: String,
        require: [true, 'User phone is required'], 
    },
    address: {
        type: String,
        require: [true, 'User address is required'],  
        minlength: [3, 'The length of address min 3 char'],
    },
    isAdmin: {
        type: Boolean,
        default: false,  
    },
    isVerified: {
        type: Boolean,
        default: false,  
    },
    isBanned: {
        type: Boolean,
        default: false,  
    },
},
{timestamps:true},
);
const User = model('Users',userSchema);

module.exports = User;