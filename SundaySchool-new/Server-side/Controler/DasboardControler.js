
const express = require("express");
const dbcon = require("../DBconfig/Dbconfig"); // your MySQL connection
const { StatusCodes } = require("http-status-codes");


const Reports = async (req, res)  => {
  try {
    // Count users
    const [userRows] = await dbcon.query("SELECT COUNT(*) as users FROM users");
    const users = userRows[0].users;

    // Count courses
    const [courseRows] = await dbcon.query("SELECT COUNT(*) as courses FROM courses");
    const courses = courseRows[0].courses;

    // Count documents
    const [documentRows] = await dbcon.query("SELECT COUNT(*) as documents FROM documents");
    const documents = documentRows[0].documents;
     // Count contents
    const [contentsRows] = await dbcon.query("SELECT COUNT(*) as contents FROM contents");
    const contents = contentsRows[0].contents;

    res.status(StatusCodes.OK).json({ users, courses, documents,contents });
  } catch (error) {
    console.error("Database query error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Database error" });
  }
}

module.exports = {
  Reports
};
