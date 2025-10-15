import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function PostCourse() {
  const [Articledata, setArticledata] = useState({
    title: "",
    subtitle: "",
    description: "", // will now contain HTML from ReactQuill
    category_id: "",
  });

  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setArticledata({ ...Articledata, [e.target.name]: e.target.value });
  };

  // ✅ ReactQuill handles rich text input
  const handleDescriptionChange = (value) => {
    setArticledata({ ...Articledata, description: value });
  };

  const validate = () => {
    let errors = {};
    if (!Articledata.title.trim()) errors.title = "Title is required.";
    if (!Articledata.description.trim()) errors.description = "Description is required.";
    if (!Articledata.category_id) errors.category_id = "Select a category.";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:2000/course/postCourse", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(Articledata),
        });

        const data = await response.json();
        if (response.ok) {
          setMessage("ምዝገባው ተሳክቷል!");
          setArticledata({
            title: "",
            subtitle: "",
            description: "",
            category_id: "",
          });
        } else {
          setMessage(data.message || "An error occurred.");
        }
      } catch (err) {
        console.error(err.message);
        setMessage(err.message);
      }
    }
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch("http://localhost:2000/course/categories");
        const data = await response.json();
        setCategories(data.category || []);
      } catch (e) {
        console.error(e.message);
      }
    };
    fetchCategory();
  }, []);
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
              name="category_id"
              value={Articledata.category_id}
              onChange={handleChange}
            >
              <option value="">ምረጥ</option>
              {categories.map((cat) => (
                <option key={cat.CATID} value={cat.CATID}>
                  {cat.CATGORYNAME}
                </option>
              ))}
            </select>
            {errors.category_id && <p style={{ color: "red" }}>{errors.category_id}</p>}
          </div>

          {/* Title */}
          <div className="mb-3">
            <label><strong>ርዕስ<span style={{color:'red',marginLeft:"5px"}}>*</span></strong></label>
            <input
              className="form-control"
              type="text"
              name="title"
              value={Articledata.title}
              onChange={handleChange}
            />
            {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
          </div>

          {/* Subtitle */}
          <div className="mb-3">
            <label><strong>ንዑስ ርዕስ:</strong></label>
            <input
              className="form-control"
              type="text"
              name="subtitle"
              value={Articledata.subtitle}
              onChange={handleChange}
            />
          </div>

          {/* ✅ Rich Text Editor */}
          <div className="mb-3">
            <label><strong>መግለጫ<span style={{color:'red',marginLeft:"5px"}}>*</span></strong></label>
            <ReactQuill
              value={Articledata.description}
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
         
          dangerouslySetInnerHTML={{ __html: Articledata.description }}
        />
         
       
      </div>
            {errors.description && <p style={{ color: "red" }}>{errors.description}</p>}
          </div>

          <button type="submit" className="btn btn-success btn-md">
            መዝግብ
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostCourse;
