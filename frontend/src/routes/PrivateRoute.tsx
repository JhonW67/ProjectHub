import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
  allowedRoles?: string[];
}
  
const PrivateRoute = ({ children, allowedRoles }: Props) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/auth/login" replace />;

  if (allowedRoles && !allowedRoles.includes(role || "")) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
