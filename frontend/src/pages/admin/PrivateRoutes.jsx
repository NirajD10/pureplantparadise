import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import AdminRootLayout from "@/pages/admin/RootLayout";

function PrivateRoutes({ ...props }) {
  let location = useLocation();
  const { adminData } = useSelector((state) => state.adminAuth);
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      {user !== null ? (
        <Navigate to="/" />
      ) : adminData?.isAdmin === true ? (
        <AdminRootLayout />
      ) : (
        <Navigate to="/admin/login" />
      )}
    </>
  );
}

export default PrivateRoutes;
