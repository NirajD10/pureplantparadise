import React from "react";
import {  menulist } from "@/data/menulist";
import { NavLink } from "react-router-dom";

function SubMenu() {
  return (
    <ul className="container flex justify-evenly items-center text-whiteprimary uppercase">
      {menulist.map((menu) => (
        <li key={menu.title}>
          <NavLink to={menu.link} reloadDocument>
            {menu.title}{" "}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default SubMenu;
