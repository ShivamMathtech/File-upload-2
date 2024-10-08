const express = require("express");
const app = express();
require("dotenv").config();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },

  filename: function (req, file, cb) {
    console.log(req.body.name);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let random = Math.floor(Math.random() * 100000);
    let filename = random + "" + file.originalname;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("image"), (req, res) => {
  res.status(200).json({
    msg: "success",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
