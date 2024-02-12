import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";


const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("LoggedUserToken");
  const expiryTime = getExpiryTimeFromToken(token);

  if (token && expiryTime && expiryTime >= Date.now()) {
    return <>{children}</>;
  } else {
   
      localStorage.removeItem("LoggedUserToken");
    

      return <Navigate to="/" />;
   
  }
};

const getExpiryTimeFromToken = (token) => {
  if (!token) {
    return null;
  }
  const tokenParts = token.split(".");
  if (tokenParts.length < 3) {
    return null;
  }
  try {
    const tokenPayload = atob(tokenParts[1]);
    const parsedToken = JSON.parse(tokenPayload);
    if (parsedToken.exp) {
      return parsedToken.exp * 1000;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error decoding or parsing the token:", error);
    return null;
  }
};

export default PrivateRoute;
