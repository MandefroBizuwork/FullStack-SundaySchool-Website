const dbcon = require("../DBconfig/Dbconfig");
const { StatusCodes } = require("http-status-codes");

// ✅ Fetch all documents (articles)
const fetchDocument = async (req, res) => {
  const sql = "SELECT * FROM article;";
  try {
    const [rows] = await dbcon.query(sql);
    res.status(StatusCodes.OK).json({ documents: rows });
  } catch (err) {
    console.error("Database query error:", err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Database error" });
  }
};

// ✅ Fetch all categories
const fetchCategory = async (req, res) => {
  const sql = "SELECT * FROM category";
  try {
    const [rows] = await dbcon.query(sql);
    res.status(StatusCodes.OK).json({ category: rows });
  } catch (err) {
    console.error("Database query error:", err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Database error" });
  }
};

// ✅ Fetch one category (and optionally its articles)
const findCategory = async (req, res) => {
  const { catid } = req.params;
   console.log(req.params)

  const sqlCategory = "SELECT * FROM category WHERE CATID = ?";
  const sqlcourse = "SELECT * FROM courses WHERE CATID = ?";

  try {
    const [categoryRows] = await dbcon.query(sqlCategory, [catid]);

    if (categoryRows.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Category not found" });
    }

    const [course] = await dbcon.query(sqlcourse,[catid]);

    res.status(StatusCodes.OK).json({
      category: categoryRows,
      courses: course,
    });
  } catch (err) {
    console.error("Database query error:", err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Database error" });
  }
};

// ✅ Post new article
const postCourse = async (req, res) => {
  try {
    const { title, subtitle, description, category_id } = req.body;

    if (!title || !description || !category_id) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "Missing required fields" });
    }

    const sql = "INSERT INTO courses (title, subtitle, description, CATID) VALUES (?, ?, ?, ?)";
    await dbcon.query(sql, [title, subtitle, description, category_id]);

    return res.status(StatusCodes.OK).json({ msg: "courses posted successfully" });
  } catch (err) {
    console.error("Error inserting courses:", err.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to post courses" });
  }
};

module.exports = {
  fetchDocument,
  fetchCategory,
  findCategory,
  postCourse,
};
