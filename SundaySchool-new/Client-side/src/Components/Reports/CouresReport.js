


import React, { useState, useEffect } from "react";

import { useParams, Link } from "react-router-dom";
// import "../../Styles/Users.css";
// import UpdateUserForm from "../../Pages/Pages/UpdateUserForm";


const CouresReport = () => {
      const { catid } = useParams();
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState(null);
const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [category, setcategory] = useState([]);

  const [Courses, setCoursesList] = useState([]);

  // ✅ Move fetch function outside useEffect so it can be reused
  const fetchCourses= async () => {
    try {
      const api = `http://localhost:2000/course/coursedetail/${catid}`;
        const response = await fetch(api);
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      setCoursesList(data.courses || []); // adjust key based on your backend response
     setcategory(data.category[0] || []);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [catid]);

  // 🟢 Delete Handler
//   const handleDelete = async (username) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       try {
//         const response = await fetch(
//           `http://localhost:2000/api/user/deleteuser/${username}`,
//           { method: "DELETE" }
//         );
//         if (!response.ok) throw new Error("Failed to delete user");
//         alert("User deleted successfully!");
//         setUserList(users.filter((user) => user.username !== username));
//       } catch (err) {
//         console.error(err);
//         alert("Error deleting user");
//       }
//     }
//   };

//   // 🟡 Update Handler
//  const handleUpdate = (user) => {
//   setSelectedUser(user);
//   setShowUpdateModal(true);
// };


//   // ✅ Handle modal close and refresh user list
//   const handleCloseModal = () => {
//     setShowSignupModal(false);
//     fetchUsercount(); // Reload data after modal closes
//   };

  return (
    <div className="card-body shadow p-5">
      {/* 🔍 Search + Add Button */}
      <div className="row justify-content-end align-items-center d-flex gap-5 mb-3">
        <div className="col-md-6">
          <div className="newssearch position-relative">
            <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3"></i>
            <input
              type="text"
              className="form-control ps-5"
              placeholder="ፈልግ..."
            />
          </div>
        </div>
        
        {/* <SignUpModal
          showModal={showSignupModal}
          onclose={handleCloseModal} // ✅ use new close handler
        /> */}
      
        {/* <UpdateUserForm
            show={showUpdateModal}
            onClose={() => setShowUpdateModal(false)}
            user={selectedUser}
            onUpdate={(updatedUser) => {
                setUserList((prev) =>
                prev.map((u) => (u.username === updatedUser.username ? updatedUser : u))
                );
            }}
            /> */}

      </div>

      {/* 🧾 User Table */}
      <div
        className="datatable-wrapper datatable-loading no-footer sortable searchable fixed-columns"
        style={{
          maxHeight: "500px",
          overflowY: "auto",
          border: "1px solid #dee2e6",
          borderRadius: "8px",
        }}
        data-aos="fade-up"
      >
        <table className="table table-striped table-hover mb-0">
          <thead
            className="custom-thead bg-light"
            style={{
              position: "sticky",
              top: "0",
              zIndex: "10",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <tr>
              <th scope="col" style={{ width: "5%" }}>#</th>
              <th scope="col">ርዕስ </th>
              <th scope="col">መግለጫ</th>
              <th scope="col">ምድብ</th>              
              <th scope="col" style={{ width: "18%" }}>አክሽን</th>
            </tr>
          </thead>
          <tbody>
            {Courses.length > 0 ? (
              Courses.map((item, index) => (
                <tr key={item.username}>
                  <td>{index + 1}</td>
                  <td>{item.Title}</td>
                  <td> 
                    <div className="formatted-content">
                        {item.description.replace(/<[^>]+>/g, '')}
                    </div>

              </td>
                  <td>{category.CATGORYNAME}</td>
                
                  <td>
                    <div className="d-flex gap-2">
                      <Link
                        className="btn btn-sm btn-warning"
                        // onClick={() => handleUpdate(item)}
                      >
                        Update
                      </Link>
                      <Link
                        className="btn btn-sm btn-danger"
                        // onClick={() => handleDelete(item.username)}
                      >
                        Delete
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted py-4">
                ምንም የተመዘገበ ትምህርት የለም
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="datatable-bottom d-flex justify-content-between align-items-center mt-2 p-2">
          <div className="datatable-info">
            <strong>Showing {Courses.length} </strong>
          </div>
          <nav className="datatable-pagination">
            <ul className="datatable-pagination-list pagination pagination-sm mb-0"></ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default CouresReport;
