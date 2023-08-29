require('dotenv').config();
const serverPort = process.env.SERVER_PORT || 3004; // Use the provided port or default to 3001
const mongodbURL = process.env.MONGODB_ATLAS_URL ||' mongodb://localhost:27017 '; // Use the provided port or default to 3001

module.exports = {serverPort,mongodbURL}