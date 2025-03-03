import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = () => {
  const token = useSelector((state) => state.token.token);

  return token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectRoute;
