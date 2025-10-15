import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppState } from "../App";
const RedirectingAuthenticated = ({ children }) => {
  const {user} = useContext(AppState)
  
const isLogedin=!!user
  if (isLogedin) {
    // If no token, redirect to login
    if(user.role==="admin"){
      return <Navigate to="/dashboard" />;
    }
    else if(user.role==="customer")
    {
      return <Navigate to="/customer" />;
    }
  }

  return children; // Render the children if authenticated
};

export default RedirectingAuthenticated;