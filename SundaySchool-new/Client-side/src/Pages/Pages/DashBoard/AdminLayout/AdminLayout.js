
import React, { useState,useEffect } from 'react'
// import AdminHeader from '../AdminHeader'

import Sidebar from '../Sidebar'
import { Outlet } from 'react-router-dom' 
import AdminHead from '../AdminHead'
const AdminLayout = () => {
  const [sideBarOpen, setSideBarOpen] = useState(true); // Default state for sidebar
  //const [isMobileView, setIsMobileView] = useState(false); // Track if screen is below 992px

  // Toggle Sidebar
  const toggleSidebar = () => {
    setSideBarOpen((prevState) => !prevState);
  };
  // Update screen size state on window resize
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 992;
      // setIsMobileView(isMobile);
      if (isMobile) {
        setSideBarOpen(false); // Close sidebar by default on smaller screens
      } else {
        setSideBarOpen(true); // Open sidebar by default on larger screens
      }
    };

    handleResize(); // Set initial state on mount
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div>
        {/* <Sidebar/> */}
   {/* <AdminHeader/> */}
  <AdminHead ToggleSidebar={toggleSidebar}/>
  <Sidebar sideBarOpen={sideBarOpen}/>
  <div id="main-container" className={`${sideBarOpen?" ":"mainToggler"}`}  >
   <Outlet/>
  </div>
{/* <AdminFooter sideBarOpen={sideBarOpen} /> */}
    </div>
  )
}

export default AdminLayout
