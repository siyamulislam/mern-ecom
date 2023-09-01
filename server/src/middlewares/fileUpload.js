const multer = require('multer');
const path = require('path');
const creteError = require('http-errors');
const { UPLOAD_USER_IMG_DIR, IMAGE_FILE_TYPES, MAX_FILE_SIZE } = require('../config');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_USER_IMG_DIR)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const extname = path.extname(file.originalname);
    // const baseName = path.basename(file.originalname, path.extname(file.originalname));
    console.log(baseName)
    cb(null, file.fieldname + '-' + uniqueSuffix + extname)
  }
});
const fileFilter = (req, file, cb) => {
  const extname = path.extname(file.originalname);
  if (!IMAGE_FILE_TYPES.includes(extname.substring(1))) {
    return cb(new Error('File type not allowed'), false);
  }
  cb(null, true);
}
const upload = multer({
  storage: storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
});

module.exports = upload;