const express = require("express");
// const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser"); // Import cookie-parser
const path = require("path");

require("dotenv").config();

const app = express();
const corsOptions = {
  origin: "http://localhost:3000", // your frontend URL
  credentials: true, // Allow credentials (cookies, Authorization headers, etc.)
};
app.use(cors(corsOptions)); // Use the custom CORS options
//  //Make sure to put in this order: bodyParser.json() first.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser()); // Use cookie-parser here
// app.use(bodyParser.urlencoded({ extended: true }));

const userRoutes = require("./Router/UserRouter");
const courseRouter = require("./Router/CourseRouter");
const documentRoutes = require("./Router/DocumentRouter");
const contentsRoutes = require("./Router/ContentsRouter");
const DashboardRoutes =require("./Router/DashboardRouter");
//jobs midle ware
// const dbcon = require("./DBconfig/Dbconfig");
app.use("/api/user", userRoutes);
app.use("/course", courseRouter);
app.use("/documents", documentRoutes);
app.use("/contents", contentsRoutes);
app.use("/api/dashboard", DashboardRoutes);

app.use("/public", express.static(path.join(__dirname, "public")));
async function StartServer() {
  try {
    app.listen(2000, (err) => {
      console.log("runing on port 2000");
    });
  } catch (err) {
    console.log(" server errorr");
  }
}
StartServer();

// app.use(express.static("public"));
