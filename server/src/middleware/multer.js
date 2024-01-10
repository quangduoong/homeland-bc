const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "../server/src/assets/uploads/listings/" + req.userId;
    // create directory under user's id
    fs.mkdir(uploadPath, (error) => {
      if (error) return console.error(error);
      console.log("Directory created successfully!");
    });

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + "-" + file.originalname;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
