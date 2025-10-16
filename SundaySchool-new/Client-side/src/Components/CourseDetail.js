import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import "../Styles/CourseDetail.css"; // 👈 we'll add a new CSS file for styling

export default function CourseDetail() {
  const { catid } = useParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState({});

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        setLoading(true);
        const api = `http://localhost:2000/course/coursedetail/${catid}`;
        const response = await fetch(api);

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        setCourses(data.courses || []);
        setCategory(data.category?.[0] || {});
      } catch (e) {
        setError("ዳታ ማግኘት አልተቻለም!");
        console.error(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetail();
  }, [catid]);

  return (
    <section className="course-detail-section container my-5 py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold section-title">
          የክፍል ምድብ -{" "}
          <strong className="text-primary">
            <i>{category.CATGORYNAME || "..."}</i>
          </strong>
        </h2>
        <div className="underline mx-auto"></div>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">ዳታ በመመጣት ላይ...</p>
        </div>
      ) : error ? (
        <p className="text-danger text-center fw-bold">{error}</p>
      ) : courses.length > 0 ? (
        <div className="row g-4">
          {courses.map((item) => (
            <div key={item.id} className="col-lg-4 col-md-6 col-sm-12">
              <div className="course-card shadow-sm p-4 rounded bg-white h-100">
                <h3 className="course-title text-center text-decoration-underline mb-3">
                  {item.Title}
                </h3>
                {item.subtitle && (
                  <h5 className="text-muted text-center mb-3">
                    {item.subtitle}
                  </h5>
                )}

                <div className="course-description">
                  {item.description
                    ? item.description.replace(/<[^>]+>/g, "")
                    : "መግለጫ የለም።"}
                </div>

                {/* <div className="mt-4 text-end">
                  <Link
                    to={`/course/${item.id}`}
                    className="btn btn-outline-primary btn-sm"
                  >
                    ዝርዝር ይመልከቱ <i className="bi bi-arrow-right-circle ms-1"></i>
                  </Link>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h4 className="text-center text-danger py-5">
          በዚህ ምድብ የተዘጋጀ ትምህርት የለም!
        </h4>
      )}
    </section>
  );
}
