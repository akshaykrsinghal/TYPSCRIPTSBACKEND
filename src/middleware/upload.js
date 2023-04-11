const multer = require("multer");

const imageFilter = (req, file, cb) => {
  //console.log(file.mimetype)
  if (file.mimetype.startsWith("image")  || file.mimetype.startsWith("text/plain") || file.mimetype.startsWith("text/html")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-bezkoder-${file.originalname}`;

    cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFile;
