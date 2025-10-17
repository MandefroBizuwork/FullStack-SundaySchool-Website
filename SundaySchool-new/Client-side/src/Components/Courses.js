import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Styles/Course.css";

function Courses() {
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const api = "http://localhost:2000/course/categories";
        const response = await fetch(api);

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        setCategories(data.category || []);
      } catch (e) {
        setError("ዳታው አልተገኘም!");
        console.error(e.message);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section id="courses" className="courses-section py-5 bg-light ">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-5 shadow py-3">
          <h2 className="fw-bold text-primary mb-2">ትምህርቶች</h2>
          <p className="text-muted mx-auto" style={{ maxWidth: "700px" }}>
            በሰንበት ትምህርት ቤታችን ተማሪዎች ከመጽሐፍ ቅዱስ፣ ከቤተክርስቲያን ታሪክ፣
            ከመንፈሳዊ ትምህርቶች ጋር የተያያዘ እውቀት ይማራሉ።
          </p>
          <div className="underline mx-auto"></div>
        </div>

        {/* Courses Grid */}
        <div className="row g-4">
          {categories.length > 0 ? (
            categories.map((cat) => {
              let iconClass;
              if (cat.CATGORYNAME === "የመጽሐፍ ቅዱስ ጥናት") iconClass = "bi-journal-text";
              else if (cat.CATGORYNAME === "የቤተክርስቲያን ታሪክ") iconClass = "bi-building";
              else iconClass = "bi-book";

              return (
                <div key={cat.CATID} className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                  <div className="course-card shadow-sm p-4 rounded bg-white text-center h-100">
                    <Link
                      to={`/Courses/coursedetail/${cat.CATID}`}
                      className="text-decoration-none d-flex flex-column align-items-center"
                      title="ሙሉውን ክፈት"
                    >
                      <div
                        className="icon-wrapper d-flex justify-content-center align-items-center mb-3"
                      >
                        <i className={`bi ${iconClass} text-white fs-2`}></i>
                      </div>
                      <h5 className="fw-bold text-dark mb-2">{cat.CATGORYNAME}</h5>
                    </Link>

                    <div className="mt-3">
                      <Link
                        to={`/Courses/coursedetail/${cat.CATID}`}
                        className="btn btn-outline-primary btn-sm"
                      >
                        ዝርዝር ይመልከቱ <i className="bi bi-arrow-right-circle ms-1"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <h4 className="text-danger text-center">{error || "ዳታ የለም!"}</h4>
          )}
        </div>
      </div>
       <div class="et_pb_bottom_inside_divider" ></div>
    </section>
  );
}

export default Courses;
