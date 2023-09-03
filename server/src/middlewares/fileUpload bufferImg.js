const multer = require('multer');
const {  MAX_FILE_SIZE, IMAGE_FILE_TYPES_BUFFER } = require('../config');

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {

  if (!file.mimetype.startsWith("image/"))
    return cb(new Error('Only image type file allowed'), false);
  if (file.size > MAX_FILE_SIZE)
    return cb(new Error(`Max allowed image size ${MAX_FILE_SIZE}`), false);
  if (!IMAGE_FILE_TYPES_BUFFER.includes(file.mimetype))
    return cb(new Error('File type not allowed'), false);

  cb(null, true);
}
const upload = multer({
  storage: storage,
  fileFilter:fileFilter,
});

module.exports = upload;