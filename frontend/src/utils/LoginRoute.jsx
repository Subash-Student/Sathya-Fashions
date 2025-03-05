import React from 'react'
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LoginRoute = () => {
    const token = useSelector((state) => state.token.token);


    return !token ? <Navigate to={"/"}/> : <Navigate to={"/dashBoard"}/>
    
}

export default LoginRoute