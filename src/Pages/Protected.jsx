import React from "react";
import { Navigate } from "react-router-dom";

 function Protected({ element }) {
  const isAdmin = localStorage.getItem("adminAuth") === "true";

  return isAdmin ? element : <Navigate to="/AdminLogin" replace />;
}
export default  Protected;