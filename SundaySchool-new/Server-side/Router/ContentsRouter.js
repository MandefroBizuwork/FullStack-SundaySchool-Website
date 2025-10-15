const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure upload directory exists
const uploadDir = "public/uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Controller imports
const { postContent, fetchContents, findContentbyCategory } = require("../Controler/ContentsControler");


const contentsRoutes = express.Router();

// Routes
contentsRoutes.get("/", fetchContents);
contentsRoutes.post("/postcontent", upload.single("myDocument"), postContent);
contentsRoutes.get("/:id", findContentbyCategory);

module.exports = contentsRoutes;
