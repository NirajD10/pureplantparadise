import React from "react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

function SidebarNav({ className, ...props }) {
  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          cn(
            buttonVariants({ variant: "primary" }),
            isActive
              ? "bg-bgprimary text-whiteprimary hover:bg-bgprimary hover:text-whiteprimary"
              : "bg-muted hover:bg-muted hover:underline hover:text-[#121212]",
            "justify-start"
          )
        }
        end
      >
        Account
      </NavLink>
      <NavLink
        to="/profile/orders"
        className={({ isActive }) =>
          cn(
            buttonVariants({ variant: "primary" }),
            isActive
              ? "bg-bgprimary text-whiteprimary hover:bg-bgprimary hover:text-whiteprimary"
              : "bg-muted hover:bg-muted hover:underline hover:text-[#121212] ",
            "justify-start"
          )
        }
      >
        Orders
      </NavLink>
    </nav>
  );
}

export default SidebarNav;
