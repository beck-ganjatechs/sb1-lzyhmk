const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "images") {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
    }
  } else if (file.fieldname === "video") {
    if (file.mimetype === "video/mp4") {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type, only MP4 is allowed!"), false);
    }
  } else if (file.fieldname === "testReport") {
    if (file.mimetype === "application/pdf" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type, only PDF and PNG is allowed!"), false);
    }
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 50 // 50MB file size limit
  }
});

module.exports = upload;