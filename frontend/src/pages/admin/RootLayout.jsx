import React from "react";
import Header from "@/components/admin/Header/Header";
import { Outlet } from "react-router-dom";
import AdminSidebar from "@/components/admin/Sidebar/Sidebar";
import { useMediaQuery } from "@uidotdev/usehooks";

function AdminRootLayout() {
  const isResponsive = useMediaQuery("only screen and (max-width: 992px)");
  return (
    <React.Fragment>
      <Header />
      <div className="sm:flex sm:flex-row sm:h-full">
        {!isResponsive && (
          <div className="w-0 sm:w-1/6">
            <AdminSidebar />
          </div>
        )}
        <div className="flex-1 mb-10 px-5 lg:px-0">
          <Outlet />
        </div>
      </div>
    </React.Fragment>
  );
}

export default AdminRootLayout;
