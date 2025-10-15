
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Header/Navbar";
import Footer from "./Footer/Footer";

function CommonLayout() {
  return (
    <>
      <Navbar />
      <Outlet />   {/* ✅ Child pages (Home, Courses, etc.) appear here */}
      <Footer />
    </>
  );
}

export default CommonLayout;

