import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBook, FaChurch, FaBible } from "react-icons/fa";
import "../Styles/Course.css"
function Courses() {
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const api = "http://localhost:2000/course/categories";
        const response = await fetch(api);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setCategories(data.category || []); // ensure it's an array
      } catch (e) {
        setError("ዳታው አልተገኘም!");
        console.error(e.message);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section
      id="courses"
      className="mt-10 bg-light shadow-sm"
      style={{ padding: "100px 32px" }}
    >
      <div className="" style={{maxwidth: "2140px"}}>
        <div className="text-center my-3 shadow py-2">
          <h2 className="fw-bold text-primary">ትምህርቶች</h2>
          <h3 className="text-muted mx-auto" style={{ maxWidth: "700px" }}>
            በሰንበት ትምህርት ቤታችን ተማሪዎች ከመጽሐፍ ቅዱስ፣ ከቤተክርስቲያን ታሪክ፣
            ከመንፈሳዊ ትምህርቶች ጋር የተያያዘ እውቀት ይማራሉ።
          </h3>
           {/* <hr style={{backgroundColor:"gray",border:"1px solid", marginbottom:"10px"}}/> */}
        </div>
       

        {/* Courses Grid */}
        <div className="row g-4 py-5" >
          {/* {error && <h2 className="text-danger text-center">{error}</h2>} */}
          {categories.length > 0 ? (
  categories.map((cat) => {
    // Dynamically choose icon
    let iconClass;
    if (cat.CATGORYNAME === "የመጽሐፍ ቅዱስ ጥናት") iconClass = "bi-journal-text";
    else if (cat.CATGORYNAME === "የቤተክርስቲያን ታሪክ") iconClass = "bi-building";
    else iconClass = "bi-book";

    return (
  <div className="col-sm-6 col-lg-4">
  <div className="coursecard shadow h-100 border-0 text-center p-4 d-flex flex-column align-items-center justify-content-between hover-shadow">
    <Link
      to={`/Courses/coursedetail/${cat.CATID}`}
      className="text-decoration-none d-flex flex-column align-items-center justify-content-center flex-grow-1"
    title="ሙሉውን ክፈት"
    >
      <div
        className="d-flex justify-content-center align-items-center mb-3 rounded-circle bg-primary"
        style={{ width: "70px", height: "70px" }}
      >
        <i className={`bi ${iconClass} text-white`} style={{ fontSize: "2rem" }}></i>
      </div>
      <h5 className="fw-bold text-dark">{cat.CATGORYNAME}</h5>
    </Link>

    {/* Button inside card */}
    <button className="btn btn-success mt-3 w-75">ሰነዱን አውርድ</button>
  </div>
</div>


    );
  })
) : (
  <h2 className="text-danger text-center">ዳታው አልተገኘም!</h2>
)}

        </div>
      </div>
    </section>
  );
}

export default Courses;
