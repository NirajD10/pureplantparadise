import React from "react";
import { Separator } from "@/components/ui/separator"
import { menulist } from "../../../data/menulist";

function ResponsiveSubMenu() {
  return (
    <ul className="h-3/4 flex flex-col justify-center items-center gap-5 text-[#121212] uppercase text-center">
      {menulist.map((menu) => (
        <React.Fragment key={menu.title}>
        <li>
          <a href={menu.link}>{menu.title} </a>
        </li>
        <Separator/>
        </React.Fragment>
      ))}
    </ul>
  );
}

export default ResponsiveSubMenu;
