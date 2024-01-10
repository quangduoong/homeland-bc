import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/Auth/AuthContextProvider";

function ProtectedRoute() {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  return (
    <div>
      {!authLoading &&
        (isAuthenticated ? <Outlet /> : <Navigate to="/signin" />)}
    </div>
  );
}

export default ProtectedRoute;
