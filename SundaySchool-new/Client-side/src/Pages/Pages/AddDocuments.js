
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


const AddDocuments = () => {
 const [form, setForm] = useState({
    title: "",
    author_name: "",
    submission_date: "",
    description: "",
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [previewHtml, setPreviewHtml] = useState("");
  const [errors, setErrors] = useState({});

  // quill modules
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };
  const formats = [
    "header", "bold", "italic", "underline", "strike",
    "list", "bullet", "align", "link", "image"
  ];



  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDescriptionChange = (value) => {
    setForm({ ...form, description: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "Title required";
    if (!form.description || form.description.trim() === "") errs.description = "Description required";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;

    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("description", form.description);
      fd.append("author_name", form.author_name || "");
      fd.append("submission_date", form.submission_date || "");
      if (file) fd.append("myDocument", file);

      const res = await fetch("http://localhost:2000/documents/upload", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Saved successfully");
        setForm({ title: "", author_name: "", submission_date: "", description: "" });
        setFile(null);
      } else {
        setMessage(data.error || "Error saving");
      }
    } catch (err) {
      console.error(err);
      setMessage("Network error");
    }
  };

  return (
  <div className="container shadow py-5">
      <h3> ጽሑፍ ያስገቡ</h3>
      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">ርዕስ<span style={{color:'red',marginLeft:"5px"}}>*</span></label>
          <input name="title" className="form-control" value={form.title} onChange={handleChange} />
          {errors.title && <small className="text-danger">{errors.title}</small>}
        </div>

        <div className="mb-3">
          <label className="form-label">የጸሐፊ ስም</label>
          <input name="author_name" className="form-control" value={form.author_name} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">ቀን<span style={{color:'red',marginLeft:"5px"}}>*</span></label>
          <input name="submission_date" type="date" className="form-control" value={form.submission_date} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">መግለጫ<span style={{color:'red',marginLeft:"5px"}}>*</span></label>
          <ReactQuill
            value={form.description}
            onChange={handleDescriptionChange}
            modules={modules}
            formats={formats}
            placeholder="እዚህ ጻፍ"
            className="custom-quill"
          />
          {errors.description && <small className="text-danger">{errors.description}</small>}
        </div>
         <h5>Preview</h5>
      <div className="border p-3" dangerouslySetInnerHTML={{ __html: form.description }} />

        <div className="mb-3">
          <label className="form-label">ምስል አስገባ (optional, max-size 5MB)</label>
          <input type="file" className="form-control" onChange={handleFileChange} accept="image/*,application/pdf" />
          {file && <small className="text-muted">Selected: {file.name}</small>}
        </div>

        <button className="btn btn-success" type="submit">መዝግብ</button>
      </form>

     

     
    </div>
  );
}

export default AddDocuments
