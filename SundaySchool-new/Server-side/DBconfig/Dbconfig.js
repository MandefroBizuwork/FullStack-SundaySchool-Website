require("dotenv").config();
const mysql = require("mysql2");
let connection = mysql.createConnection({
  host: process.env.DB_HOST, // or 127.0.0.1
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect(function (err) {
  if (err) {
    console.error("Database cannot be connected:");
    return;
  } else {
    console.log("Database Connected successfully");
  }
});

module.exports = connection.promise();
