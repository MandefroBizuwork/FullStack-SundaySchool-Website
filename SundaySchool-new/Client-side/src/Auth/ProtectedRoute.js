// import { useContext } from "react";
import { Navigate,Outlet } from "react-router-dom";

// import { AppState } from "../../App";

// const ProtectedRoute = ({ children }) => {
// //  const {user}=useContext(AppState)
// const token=localStorage.getItem("token")
//   if (!token) {
//     // If no token, redirect to login
//     return <Navigate to="/login" />;
//   }

//   return children; // Render the children if authenticated
// };

// export default ProtectedRoute;
const ProtectedRoute = ({  isAllowed,  redirectPath,  children}) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath}  replace= "false"  />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute