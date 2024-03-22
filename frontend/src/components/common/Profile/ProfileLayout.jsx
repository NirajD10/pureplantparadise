import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import SidebarNav from "./SidebarNav";

import { Separator } from "@/components/ui/separator";

function ProfileLayout() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="container space-y-6 p-10 pb-16 md:block">
      {user === null ? (
        <div className="h-[50svh] flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold tracking-tight">Couldn't process. <span role="img" aria-label="Failed to access account">😞</span></h2>
            <p className="text-muted-foreground">
              Kindly please sign in or register account.
            </p>
        </div>
      ) : (
        <React.Fragment>
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
            <p className="text-muted-foreground">
              Manage your account settings or orders.
            </p>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/5">
              <SidebarNav />
            </aside>
            <div className="flex-1 lg:max-w-5xl">
              <Outlet />
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default ProfileLayout;
