import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../Header.css";

function Usersidebar({ sideBarOpen }) {
 
  return (
    <aside
      id="sidebar"
      className={`mysidebar ${sideBarOpen ? "showsidbar" : "hidesidbar"} `}
    >
    <hr style={{backgroundColor:"black", height:"1.5px"}}/>
      <ul className="sidebar-nav mb-auto" id="sidebar-nav">
      <li className="nav-item">
          <Link className="nav-link collapsed" to="/customer">
            <i className="bi bi-grid"></i>
            <span>Job lists</span>
          </Link>
        </li>
        <li className="nav-item">
          <a className="nav-link collapsed" href="#">
            <i className="bi bi-grid"></i>
            <span>Applied jobs</span>
          </a>
        </li>
        <li className="nav-item">
          <Link className="nav-link collapsed"  to="/customer/myprofile">
            <i className="bi bi-grid"></i>
            <span>My profile</span>
          </Link>
        </li>
       
       
       

        {/* <!-- End Login Page Nav -->

      <!-- End Error 404 Page Nav -->

      <!-- End Blank Page Nav --> */}
      </ul>
    </aside>
  );
}

export default Usersidebar;
