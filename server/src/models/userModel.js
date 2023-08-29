const { Schema,model } = require("mongoose");
const bcrypt = require('bcrypt');
const { defaultImagePath } = require("../secret");

 
const users = [
    { id: 1, name: "siyamul", email: 'siyamul.cse@gmail.com' },
    { id: 2, name: "siyamul2", email: 'siyamul2.cse@gmail.com' },
    { id: 3, name: "siyamul3", email: 'siyamul3.cse@gmail.com' },
];

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
        type: String, 
        default:defaultImagePath,
    },
    phone: {
        type: String,
        require: [true, 'User phone is required'],  
    },
    address: {
        type: String,
        require: [true, 'User address is required'],  
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

module.exports = {users,User};