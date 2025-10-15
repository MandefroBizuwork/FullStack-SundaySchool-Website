
const dbcon = require("../DBconfig/Dbconfig");
const { StatusCodes } = require("http-status-codes");
const path = require("path");
const fs = require("fs");
 // Fetch documents
 const fetchDocument = async (req, res) => {
    const sql = "SELECT * FROM `documents` order by created_at DESC";
  
    try {
      // Assuming dbcon.query returns a promise
      const [rows] = await dbcon.query(sql); // Use await for async query
      const data = { Documents: rows };
  
      // Send response as JSON
      res.status(200).json(data);
    } catch (err) {
      console.error("Database query error:", err);
      res.status(500).json({ error: "Database error" }); // Handle errors appropriately
    }
  };
  const getDocumentById = async (req, res) => {
  try {
  

 const { id } = req.params;
const sql = "SELECT * FROM documents WHERE id = ?";
const [rows] = await dbcon.query(sql, [id]);

if (rows.length === 0) {
  return res.status(404).json({ error: "Document not found" });
}


    res.status(StatusCodes.OK).json({
      Documents: rows,
      
    });


  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

  // Upload document
  const uploadDocument = async (req, res) => {


     try {
    // file is optional (multer attaches req.file)
    const { title, description, author_name, submission_date } = req.body;

    if (!title || !description) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "Title and description are required" });
    }

    // sanitize description to avoid XSS (allow basic tags)
 

    let file_path = null;
    let file_type = null;
    if (req.file) {
      file_path = req.file.path.replace(/\\/g, "/"); // normalize windows backslash
      const ext = path.extname(req.file.originalname).toLowerCase();
      if (ext === ".pdf") file_type = "pdf";
      else if ([".png", ".jpg", ".jpeg", ".gif", ".webp"].includes(ext)) file_type = "image";
      else file_type = "other";
    }

    const sql = `INSERT INTO documents (title, description, author_name, submission_date, file_path, file_type)
                 VALUES (?, ?, ?, ?, ?, ?)`;

    const [result] = await dbcon.query(sql, [
      title,
      description,
      author_name || null,
      submission_date || null,
      file_path,
      file_type,
    ]);

    return res.status(StatusCodes.OK).json({ msg: "Saved", id: result.insertId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
  }
  
  // Delete document
  const deleteDocument = async (req, res) => {
  try{
    const { id } = req.params;
  
    const sql = "DELETE FROM documents WHERE id = ?";
    
    dbcon.query(sql, [id]);
    return res.status(StatusCodes.OK).json({msg:"Deleted successfully"})
  }catch(err){
    console.log(err.message)
}
  };
  
  module.exports = {
    fetchDocument,
    getDocumentById,
    uploadDocument,
    deleteDocument
  };