const mongoose = require("mongoose");
const { mongodbURL } = require("../secret");
const connectDatabase =  async (options ={})=>{
    try {
        await mongoose.connect(mongodbURL,options );
        console.log('DB Connecting Success');
        mongoose.connection.on('error',(error)=>{
            console.error('DB Connection error:',error);
        })
    } catch (error) {
        console.error('DB Could not Connecting:',error.toString());
    }
}

module.exports ={connectDatabase};