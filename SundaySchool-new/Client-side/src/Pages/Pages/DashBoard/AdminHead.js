import React, { useState, useContext, useEffect,useRef } from "react";
// import Profile from "../../../images/profile.jpg";
// import AdminLogo from "../../../images/aminLogo.png";
import { AppState } from "../../../App";
import { Link } from "react-router-dom";
const AdminHead = ({ ToggleSidebar }) => {
  const [openProfileMenu, setopenProfileMenu] = useState(false);
  const { user, logout } = useContext(AppState); // Correctly access the context
  const [userCounts, setUserCount] = useState(0);
  const [userlist, setuserlist] = useState([]);
  const [error, setError] = useState("");
  const DropDawnToggle = () => {
    setopenProfileMenu((prev) => !prev);
  };

  const [isSearchVisible, setisSearchVisible] = useState(false);
  const [notifIsOpend, setnotifIsOpend] = useState(false);
  const showNotif = () => {
    setnotifIsOpend((prev) => !prev);
  };

 
  useEffect(() => {
    const fetchUsercount = async () => {
      try {
        const api = "http://localhost:2000/api/user/userReport";
        const response = await fetch(api);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const userdata = await response.json();
        // console.log(userdata)

        setUserCount(userdata.latestuser.length);
        setuserlist(userdata.latestuser);
        // console.log(userdata.latestuser.length)
        // if (userdata.latestuser[0].length == 0) {
        //   setError("No notification found");
        // }
        //  console.log(userdata.latestuser[0].FirstName)
      } catch (e) {
        // setError(e.message);
        console.log(e.message);
      }
    };

    fetchUsercount();
  }, [user]);
  console.log(userlist.length);
  const notifContentRef = useRef(null); // Reference to the content
  const notifbuttonRef = useRef(null);
  const searchContentRef = useRef(null); // Reference to the content
  const searchbuttonRef = useRef(null);
  const profileContentRef = useRef(null); // Reference to the content
  const profilebuttonRef = useRef(null);
  const calculateTimeAgo = (timestamp) => {
    const createdTime = new Date(timestamp);
    const now = new Date();
    const timeDiff = Math.floor((now - createdTime) / 1000); // Difference in seconds

    if (timeDiff < 60) return `${timeDiff} seconds ago`;
    if (timeDiff < 3600) return `${Math.floor(timeDiff / 60)} minutes ago`;
    if (timeDiff < 86400) return `${Math.floor(timeDiff / 3600)} hours ago`;
    return `${Math.floor(timeDiff / 86400)} days ago`;
  };

  const handleClickOutside = (event) => {
     // Ensure the click is not on the button or inside the notification content
     if (
      notifContentRef.current &&
      !notifContentRef.current.contains(event.target) &&
      notifbuttonRef.current &&
      !notifbuttonRef.current.contains(event.target)
    ) {
      setnotifIsOpend(false);
    }
    if (
      searchContentRef.current &&
      !searchContentRef.current.contains(event.target) &&
      searchbuttonRef.current &&
      !searchbuttonRef.current.contains(event.target)
    ) {
      setisSearchVisible(false);
    }
    if (
      profileContentRef.current &&
      !profileContentRef.current.contains(event.target) &&
      profilebuttonRef.current &&
      !profilebuttonRef.current.contains(event.target)
    ) {
      setopenProfileMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div>
      <header
        id="header"
        className="Adminheader fixed-top d-flex align-items-center Adminheader-scrolled"
      >
        <div className="d-flex align-items-center justify-content-between">
          <a href="#" className="logo d-flex align-items-center" style={{textDecoration:"none"}}>
            {/* <img src={AdminLogo} alt="" /> */}
            <span className="d-none d-lg-block">መድሃኒአለም ሰንበት ት/ቤት</span>
          </a>
          {/* <i className="bi bi-list toggle-sidebar-btn"></i> */}
          {/* bar icon */}
          <svg
            onClick={ToggleSidebar}
            className="toggle-sidebar-btn"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
        </div>

     

        <nav className="Adminheader-nav ms-auto">
          <ul className="d-flex align-items-center mx-5">
           

            <li className="nav-item dropdown">
              <button
               ref={notifbuttonRef}
                className={`nav-link nav-icon showNotif `}
                onClick={showNotif}
              
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-bell"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                </svg>
                <span className="badge bg-primary badge-number">{userCounts}</span>
              </button>
              {notifIsOpend && (
        <ul
          ref={notifContentRef}
          className={`notifications ${notifIsOpend ? "openNotif" : ""}`}
        >
          <li className="dropdown-header">
            {userCounts > 0 ? (
              <p>
                You have{" "}
                <small style={{ color: "red", fontWeight: "bold" }}>
                  {userCounts}
                </small>{" "}
                new notifications
              </p>
            ) : null}
          </li>
          <li>
            <hr
              className="dropdown-divider"
              style={{ backgroundColor: "rgb(88, 87, 87)" }}
            />
          </li>

          {userlist && userlist.length > 0 ? (
            userlist.map((item, key) => (
              <React.Fragment key={key}>
                <li className="notification-item">
                  <i className="bi bi-exclamation-circle text-warning"></i>
                  <div>
                    <small>{`${item.FirstName} ${item.LastName}`}</small>
                    <a className="seeDetailbuton" href="#">
                      <span className="badge text-center rounded-pill bg-primary">
                        See detail
                      </span>
                      <small>{calculateTimeAgo(item.timestamp)}</small>
                    </a>
                  </div>
                </li>
                <hr
                  className="dropdown-divider"
                  style={{ backgroundColor: "rgb(88, 87, 87)" }}
                />
              </React.Fragment>
            ))
          ) : (
            <li style={{ textAlign: "center", color: "gray" }}>
              No notifications found
            </li>
          )}

          {userCounts > 0 && (
            <li style={{ textAlign: "center", marginBottom: "5px" }}>
              <a
                href="#"
                className="badge rounded-pill bg-primary p-2 ms-2 text-center viewAllbuton"
              >
                View all
              </a>
            </li>
          )}
        </ul>
      )}
            </li>

           

            <li className="nav-item dropdown pe-3">
              <a
              ref={profilebuttonRef}
                id="profile-btn"
                className="nav-link nav-profile d-flex align-items-center pe-0"
                href="#"
             
                onClick={DropDawnToggle}
              >
                {/* <img
                  src={Profile}
                  alt="Profile"
                  className="rounded-circle"
                  style={{ width: "30px", padding: "1px" }}
                /> */}
                <span className="d-none d-md-block ps-2">{user?.email}</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.00003 8.5C6.59557 8.5 6.23093 8.74364 6.07615 9.11732C5.92137 9.49099 6.00692 9.92111 6.29292 10.2071L11.2929 15.2071C11.6834 15.5976 12.3166 15.5976 12.7071 15.2071L17.7071 10.2071C17.9931 9.92111 18.0787 9.49099 17.9239 9.11732C17.7691 8.74364 17.4045 8.5 17 8.5H7.00003Z"
                      fill="#000000"
                    ></path>{" "}
                  </g>
                </svg>
              </a>

              <ul
              ref={profileContentRef}
                className={`dropdown-menu-end dropdown-menu-arrow profile mx-5 ${
                  openProfileMenu ? "menu-show" : ""
                } `}
                id="DropItems"
                data-popper-placement="bottom-end"
              >
                <li>
                  <a className="dropdown-item" href="/update_client_profile/3144">
                    Profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/change-password/">
                    Change Password
                  </a>
                </li>

                <li className="dropdown-divider"></li>
                <li>
                  <button className="dropdown-item" onClick={logout}>
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default AdminHead;
