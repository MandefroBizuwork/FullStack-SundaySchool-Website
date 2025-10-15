const path = require("path");
const dbcon = require("../DBconfig/Dbconfig");
const { StatusCodes } = require("http-status-codes");

// Fetch all documents
const fetchContents = async (req, res) => {
  const sql = "SELECT * FROM contents;";
  try {
    const [rows] = await dbcon.query(sql);
    res.status(StatusCodes.OK).json({ contents: rows });
  } catch (err) {
    console.error("Database query error:", err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Database error" });
  }
};

// Fetch contents by category
const findContentbyCategory = async (req, res) => {
  const { category } = req.params;
  console.log(req.params);

  const sqlCategory = "SELECT * FROM contents WHERE category = ?";
  try {
    const [categoryRows] = await dbcon.query(sqlCategory, [category]);

    if (categoryRows.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Category not found" });
    }

    res.status(StatusCodes.OK).json({
      category: categoryRows,
    });
  } catch (err) {
    console.error("Database query error:", err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Database error" });
  }
};

// Post new content
const postContent = async (req, res) => {
  try {
    const { title, description, content, event_date, category } = req.body;

    if (!title || !description || !category) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "Missing required fields" });
    }

    let file_path = null;
    let file_type = null;

    if (req.file) {
      file_path = req.file.path.replace(/\\/g, "/");
      const ext = path.extname(req.file.originalname).toLowerCase();
      if (ext === ".pdf") file_type = "pdf";
      else if ([".png", ".jpg", ".jpeg", ".gif", ".webp"].includes(ext))
        file_type = "image";
      else file_type = "other";
    }

    const sql = `
      INSERT INTO contents (title, description, content, event_date, category, file_path)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    await dbcon.query(sql, [
      title,
      description,
      content,
      event_date,
      category,
      file_path
      
    ]);

    return res.status(StatusCodes.CREATED).json({ msg: "Content posted successfully!" });
  } catch (err) {
    console.error("❌ Error inserting article:", err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to post article" });
  }
};

module.exports = {
  fetchContents,
  findContentbyCategory,
  postContent,
};
