const fs = require("fs");

const deleteImage = async(imagePath)=>{
    try {
        await fs.promises.access(imagePath);
        await fs.promises.unlink(imagePath);
        console.log('User Image Successfully Deleted')
    } catch (error) {
        console.error('User image does not exist!')
    } 
}
module.exports= {deleteImage};