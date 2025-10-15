const express = require("express");
const multer = require("multer");
const path = require("path");

// Multer setup for file upload with type validation
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/documents");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   }
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
//   const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimeType = allowedTypes.test(file.mimetype);

//   if (extName && mimeType) {
//     return cb(null, true);
//   } else {
//     cb(new Error("Error: File type not supported!"), false);
//   }
// };

// const upload = multer({ storage: storage });
// Configure Multer for file upload
const documentRouter = express.Router();
const { deleteDocument, uploadDocument, fetchDocument,getDocumentById } = require("../Controler/DocumentControler");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });



documentRouter.get("/", fetchDocument);
documentRouter.post("/upload", upload.single("myDocument"), uploadDocument);
documentRouter.delete("/delete/:id", deleteDocument); // Changed to DELETE method
documentRouter.get("/:id", getDocumentById); // Changed to DELETE method

module.exports = documentRouter;