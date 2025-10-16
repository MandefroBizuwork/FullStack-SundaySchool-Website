import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Sidebar({ sideBarOpen }) {
  const [isCollapsed, setIscollapsed] = useState(true);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const collapseMenu1 = () => {
    setIscollapsed((prev) => !prev);
  };
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
    <aside
      id="sidebar"
      className={`mysidebar ${sideBarOpen ? "showsidbar" : "hidesidbar"} `}
    >
      <hr style={{ backgroundColor: "black", height: "1.5px" }} />

      <ul className="sidebar-nav mb-auto" id="sidebar-nav">
        {/* Dashboard */}
        <li className="nav-item">
          <Link className="nav-link collapsed d-flex align-items-center" to="/dashboard">
            <i className="bi bi-house-door-fill me-2"></i>
            <span style={{ letterSpacing: "2px" }}>ዋና ገጽ</span>
          </Link>
        </li>

        {/* Courses Dropdown */}
        <li className="nav-item">
          <a
            onClick={collapseMenu1}
            style={{ position: "relative", cursor: "pointer" }}
            className="nav-link d-flex align-items-center"
          >
            <i className="bi bi-journal-bookmark-fill me-2"></i>
            <span style={{ letterSpacing: "2px" }}>ትምህርቶች</span>
            <i
              className={`bi ${
                isCollapsed ? "bi-chevron-up" : "bi-chevron-down"
              } ms-auto`}
              style={{ position: "absolute", right: "10px" }}
            ></i>
          </a>

          <ul
            id="form-collapse"
            data-bs-parent="#sidebar-nav"
            className={`sidbarDropdown-container ${
              isCollapsed ? "" : "form-collapse"
            }`}>
                   {
                      categories.length > 0 ? (
                      categories.map((cat) => {
                        // Dynamically choose icon
                        let iconClass;
                        if (cat.CATGORYNAME === "የመጽሐፍ ቅዱስ ጥናት") iconClass = "bi-journal-text";
                        else if (cat.CATGORYNAME === "የቤተክርስቲያን ታሪክ") iconClass = "bi-building";
                        else iconClass = "bi-book";

                        return (
                          <> 
                
                          <li>
                            <Link  to={`Courses/CouresReport/${cat.CATID}`} className="d-flex align-items-center">
                              <i className="bi bi-book-half me-2"></i>
                              <span style={{ letterSpacing: "2px" }}>{cat.CATGORYNAME}</span>
                            </Link>
                           </li>
                            <hr style={{ backgroundColor: "#585757" }} />
                            </>
                            
                        
                        );
                      })
                    ) : (
                      <h2 className="text-danger text-center">ዳታው አልተገኘም!</h2>
                    )}
                              
          
          
          </ul>
        </li>

        {/* Add New Course */}
        <li className="nav-item">
          <Link className="nav-link collapsed d-flex align-items-center" to="/dashboard/PostCourse">
            <i className="bi bi-pencil-square me-2"></i>
            <span style={{ letterSpacing: "2px" }}>ትምህርት አስገባ</span>
          </Link>
        </li>

        {/* Add Content */}
        <li className="nav-item">
          <Link className="nav-link collapsed d-flex align-items-center" to="/dashboard/PostContent">
            <i className="bi bi-file-earmark-text-fill me-2"></i>
            <span style={{ letterSpacing: "2px" }}>ይዘት አስገባ</span>
          </Link>
        </li>

        {/* Add Documents */}
        <li className="nav-item">
          <Link className="nav-link collapsed d-flex align-items-center" to="/dashboard/AddDocuments">
            <i className="bi bi-folder-plus me-2"></i>
            <span style={{ letterSpacing: "2px" }}>ሰነድ አስገባ</span>
          </Link>
        </li>

        {/* View Users */}
        <li className="nav-item">
          <Link className="nav-link collapsed d-flex align-items-center" to="/dashboard/usersReport">
            <i className="bi bi-people-fill me-2"></i>
            <span style={{ letterSpacing: "2px" }}>አባላት ተመልከት</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
