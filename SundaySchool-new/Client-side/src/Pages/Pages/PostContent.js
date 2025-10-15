

import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function PostContent() {
  const [form, setForm] = useState({
    title: "",    
    description: "", // will now contain HTML from ReactQuill
    category:"",
    content: "",
    event_date:"",
  });

//   const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
 const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ ReactQuill handles rich text input
  const handleDescriptionChange = (value) => {
    setForm({ ...form, content: value });
  };

  const validate = () => {
    let errors = {};
    if (!form.title.trim()) errors.title = "Title is required.";
    if (!form.description.trim()) errors.description = "Description is required.";
    if (!form.category) errors.category = "Select a category.";
    return errors;
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
       fd.append("content", form.content);
      fd.append("category", form.category || "");
      fd.append("event_date", form.event_date || "");
      if (file) fd.append("myDocument", file);

      const res = await fetch("http://localhost:2000/contents/postcontent", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Saved successfully");
        setForm({ title: "", category: "", event_date: "", description: "",content: "" });
        setFile(null);
      } else {
        setMessage(data.error || "Error saving");
      }
    } catch (err) {
      console.error(err);
      setMessage("Network error");
    }
  };

//   useEffect(() => {
//     const fetchCategory = async () => {
//       try {
//         const response = await fetch("http://localhost:2000/course/categories");
//         const data = await response.json();
//         setCategories(data.category || []);
//       } catch (e) {
//         console.error(e.message);
//       }
//     };
//     fetchCategory();
//   }, []);
const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }], // ✅ alignment buttons
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "align", // ✅ must include align here too
    "link",
    "image",
  ];
 const categories = [
  { id: 1, name: "ዜና" },
  { id: 2, name: "ክንውን" },
  { id: 3, name: "መዝሙር" },
  { id: 4, name: "ትምህርት" },
  { id: 5, name: "ልዩ ይዘት" },
];
const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };
  return (
    <div className="container shadow py-5">
      <div className="container">
        <form onSubmit={handleSubmit}>
          {message && <div className="alert alert-success">{message}</div>}

          {/* Category */}
          <div className="mb-3">
            <label><strong>ምድብ ምረጥ<span style={{color:'red',marginLeft:"5px"}}>*</span></strong></label>
            <select
              className="form-select"
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option value="">ምረጥ</option>
              {categories.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.category && <p style={{ color: "red" }}>{errors.category}</p>}
          </div>

          {/* Title */}
          <div className="mb-3">
            <label><strong>ርዕስ<span style={{color:'red',marginLeft:"5px"}}>*</span></strong></label>
            <input
              className="form-control"
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
            />
            {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
          </div>
            <div className="mb-3">
            <label><strong>ቀን<span style={{color:'red',marginLeft:"5px"}}>*</span></strong></label>
            <input
              className="form-control"
              type="date"
              name="event_date"
              value={form.event_date}
              onChange={handleChange}
            />
            {/* {errors.title && <p style={{ color: "red" }}>{errors.title}</p>} */}
          </div>

          {/* Subtitle */}
          <div className="mb-3">
            <label><strong>መግለጫ<span style={{color:'red',marginLeft:"5px"}}>*</span></strong></label>
            <input
              className="form-control"
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          {/* ✅ Rich Text Editor */}
          <div className="mb-3">
            <label><strong>ዋና ይዘት አስቀምጥ<span style={{color:'red',marginLeft:"5px"}}>*</span></strong></label>
            <ReactQuill
              value={form.content}
              onChange={handleDescriptionChange}
              theme="snow"     
            modules={modules}
            formats={formats}
            placeholder="እዚህ ጻፍ..."
           className="custom-quill"
            />
            <div className="">
        <h5 className="">Preview:</h5>
    
        <div className="p-3" style={{ textAlign: "initial" }}
         
          dangerouslySetInnerHTML={{ __html: form.content }}
        />        
          </div>
            {errors.description && <p style={{ color: "red" }}>{errors.content}</p>}
          </div>
           <div className="mb-3">
          <label className="form-label">ምስል አስገባ (optional, max 5MB)</label>
          <input type="file" className="form-control" onChange={handleFileChange} accept="image/*,application/pdf" />
          {file && <small className="text-muted">Selected: {file.name}</small>}
        </div>

          <button type="submit" className="btn btn-success btn-md">
            መዝግብ
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostContent;
