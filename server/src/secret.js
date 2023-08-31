require('dotenv').config();
const serverPort = process.env.SERVER_PORT || 3004; // Use the provided port or default to 3001
const mongodbURL = process.env.MONGODB_ATLAS_URL ||' mongodb://localhost:27017 '; // Use the provided port or default to 3001
const defaultImagePath = process.env.DEFAULT_USER_IMG_PATH || 'public/images/users/defaultUser.png';
const jwtActivationKey= process.env.JWT_ACTIVATION_KEY || "haireohsona";
const smtpUserName= process.env.SMTP_USERNAME || ""; 
const smtpUserPassword= process.env.SMTP_PASSWORD || ""; 
const clientURL= process.env.CLIENT_URL || ""; 
const serverURL= process.env.SERVER_URL || ""; 
const uploadDir= process.env.UPLOAD_DIR || "public/images/users"; 

module.exports = {serverURL,clientURL,serverPort,mongodbURL,
    defaultImagePath,jwtActivationKey,smtpUserName,smtpUserPassword,
    uploadDir,
}