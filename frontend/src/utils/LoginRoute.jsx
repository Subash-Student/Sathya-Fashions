import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LoginRoute = ({ children }) => {
  const token = useSelector((state) => state.token.token);

  return token ? <Navigate to="/dashBoard" /> : children;
};

export default LoginRoute;
