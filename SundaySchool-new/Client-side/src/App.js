import React from "react";
import { useEffect,createContext,useState } from "react";

// import {
//   BrowserRouter as Router,
//   Routes,useNavigate ,
//   Route,
// } from "react-router-dom";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Legal from "./Pages/Legal";
import NotFound from "./Pages/NotFound";
import Appointment from "./Pages/Appointment";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 
import Courses from "./Components/Courses";
import CommonLayout from "./Components/SharedLayout/CommonLayout";
import NewsSection from "./Components/NewsSection";
import Videos from "./Components/Videos";
import CourseDetail from "./Components/CourseDetail";
import Coursedetail from "./Components/CourseDetail";
// import RedirectingAuthenticated from "./Auth/RedirectingAuthenticated"
// import Login from "./Components/Login";
// import  Register  from "./Components/Register";
import ProtectedRoute from "./Auth/ProtectedRoute"
import AdminLayout from "./Pages/Pages/DashBoard/AdminLayout/AdminLayout"
import DashboardPage from "./Pages/Pages/DashBoard/maincontainer/DashboardPage"
import PostArticle from "./Pages/Pages/PostCourse";

import DocumentDetail from "./Components/DocumentDetail";
import AddDocuments from "./Pages/Pages/AddDocuments";
import PostContent from "./Pages/Pages/PostContent";
import Users from "./Pages/Pages/Users";
export const AppState = createContext();
function App() {
  const [user, setUser] = useState(null);
  const token = window.localStorage.getItem("token");
  const loadUser = async () => {
    try {
      const response = await fetch("http://localhost:2000/api/user/checkuser", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        setUser(data);
      } else {
        console.error("Failed to fetch user:", response.status);
        localStorage.removeItem("token");
        navigate("/");
        setUser(null);
      }
    } catch (error) {
      console.error(
        "Error during authentication:",
        error.response?.data || error.message
      );
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  useEffect(() => {
    loadUser();
    
  }, [token]);
  

 
    // Initialize AOS with custom settings
  
  const navigate = useNavigate();
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  // const contextValue = useMemo(() => ({ user, setUser, logout }), [user]);
  console.log(user);
  return (
    <div className="App">
      {/* ✅ Router wrapper is required */}
            {/* <Router basename="/Sundayschool"></Router> */}
    <AppState.Provider value={{ user, setUser, logout }}>
  
        <Routes>
          <Route path="/" element={<CommonLayout />}>
            <Route index element={<Home />} />
            <Route path="courses" element={<Courses />} />
              <Route path="NewsSection" element={<NewsSection />} />            
            <Route path="Video" element={<Videos />} />
            <Route path="appointment" element={<Appointment />} />
            <Route path="courses" element={<Courses />} />
             {/* <Route
              path="/Register"
              element={
                <RedirectingAuthenticated>
                  <Register />
                </RedirectingAuthenticated>
              }
            /> */}
          
            {/* <Route
              path="/login"
              element={
                <RedirectingAuthenticated>
                  <Login />
                </RedirectingAuthenticated>

              }
             
            />           */}
          
            <Route path="courses/:Category" element={<CourseDetail />} />
            <Route path="/Courses/coursedetail/:catid" element={<Coursedetail />} />
             <Route path="/documents/:id" element={<DocumentDetail />} />
            <Route path="*" element={<NotFound />} />
          </Route>
            <Route
            path="/dashboard"
            element={
              // <ProtectedRoute
              //   redirectPath="/"
              //   isAllowed={!!user && user.role.includes("admin")}
              // >
                <AdminLayout />
              // </ProtectedRoute>
            }
          >
           
            <Route index element={<DashboardPage />} />
            <Route path="postarticle" element={<PostArticle />} />
            <Route path="AddDocuments" element={<AddDocuments />} />
           <Route path="PostContent" element={<PostContent />} />
           <Route path="users" element={<Users />} />
            
           
            {/* <Route path="jobs" element={<Jobs />} />
            <Route path="usersPage" element={<UserList />} />  */
            }
  
          </Route>
        </Routes>
      </AppState.Provider>
    </div>
  );
}

export default App;
