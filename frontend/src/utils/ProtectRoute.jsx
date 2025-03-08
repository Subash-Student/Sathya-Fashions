import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectRoute = ({ children }) => {
  const token = useSelector((state) => state.token.token);

  return token ? children : <Navigate to="/" />;
};

export default ProtectRoute;
