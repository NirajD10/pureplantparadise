import React from "react";
import { Sidebar } from "keep-react";
import {
  HardDrives,
  IdentificationBadge,
  Gear,
  ShoppingBagOpen,
  SquaresFour,
  CirclesThreePlus,
  Users,
  ArchiveBox,
} from "phosphor-react";
import { NavLink } from "react-router-dom";

function AdminSidebar() {
  return (
    <Sidebar
      aria-label="Admin Sidebar"
      className="fixed w-3/5 md:w-[40%] lg:w-1/6 lg:border-r-[1px] lg:border-r-[#121212]/10 h-[100svh] block"
    >
      <Sidebar.ItemGroup>
        <NavLink to="dashboard">
          <div>
            <Sidebar.Item icon={<SquaresFour size={24} />}>
              Dashboard
            </Sidebar.Item>
          </div>
        </NavLink>
        <NavLink to="orders">
          <div>
            <Sidebar.Item icon={<ArchiveBox size={24} />}>Orders</Sidebar.Item>
          </div>
        </NavLink>
        <Sidebar.Collapse icon={<Users size={24} />} label="Customers">
          <NavLink to="customer-list">
            <div>
              <Sidebar.Item icon={<IdentificationBadge size={24} />}>
                Customer List
              </Sidebar.Item>
            </div>
          </NavLink>
        </Sidebar.Collapse>
      </Sidebar.ItemGroup>
      <Sidebar.ItemGroup>
        <p className="font-bold text-base mb-2 ">Catalog</p>
        <NavLink to="products">
          <div>
            <Sidebar.Item icon={<ShoppingBagOpen size={24} />}>
              Products
            </Sidebar.Item>
          </div>
        </NavLink>
        <NavLink to="categories">
          <div>
            <Sidebar.Item icon={<CirclesThreePlus size={24} />}>
              Categories
            </Sidebar.Item>
          </div>
        </NavLink>
        <NavLink to="attributes">
          <div>
            <Sidebar.Item icon={<HardDrives size={24} />}>
              Attributes
            </Sidebar.Item>
          </div>
        </NavLink>
      </Sidebar.ItemGroup>
      <Sidebar.ItemGroup>
        <p className="font-bold text-base">Site</p>
        <NavLink to="settings">
          <Sidebar.Item icon={<Gear size={24} />}>Settings</Sidebar.Item>
        </NavLink>
      </Sidebar.ItemGroup>
    </Sidebar>
  );
}

export default AdminSidebar;
