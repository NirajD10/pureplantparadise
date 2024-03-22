import React from "react";
import { useSelector } from "react-redux";
import { Navbar } from "keep-react";
import { useMediaQuery } from "@uidotdev/usehooks";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import AdminSidebar from "@/components/admin/Sidebar/Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AccountDropdown from "./AccountDropdown";

import { List } from "phosphor-react";
import logo from "@/assets/LOGO.png";
import { Link } from "react-router-dom";

function Header() {
  const isResponsive = useMediaQuery("only screen and (max-width: 992px)");
  const { adminData } = useSelector((state) => state.adminAuth);
  return (
    <React.Fragment>
      <header className="sticky top-0 z-10 border-b-[1px] border-b-[#121212]/10">
        <div>
          <Navbar fluid={true} className="!py-5 bg-neutral-25">
            <Navbar.Container className="flex items-center justify-between sm:px-3">
              {isResponsive ? (
                <Sheet>
                  <SheetTrigger>
                    <List size={26} />
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <p className="text-lg text-[#121212] mt-2 font-bold uppercase">
                        Menu
                      </p>
                    </SheetHeader>
                    <AdminSidebar />
                  </SheetContent>
                </Sheet>
              ) : null}
              <Navbar.Brand>
                <Link to="/admin/dashboard" reloadDocument>
                <img
                  src={logo}
                  alt="pureplantparadise Logo"
                  className="block w-[120px] h-[48px]"
                />
                </Link>
              </Navbar.Brand>
              {/* <Navbar.Collapse
                collapseType="sidebar"
                className="fixed right-0 top-0 bg-white p-10 xl:!w-1/6 lg:!w-2/6 md:!w-1/2"
              >
                <Navbar.Container tag="ul" className="flex flex-col gap-5">
                  <Navbar.Link
                    linkName="Home"
                    icon={<CaretDown size={20} />}
                    className="!py-0"
                  />
                  <Navbar.Link
                    linkName="Projects"
                    icon={<CaretDown size={20} />}
                    className="!py-0"
                  />
                  <Navbar.Link
                    linkName="Blogs"
                    icon={<CaretDown size={20} />}
                    className="!py-0"
                  />
                  <Navbar.Link linkName="News" className="!py-0" />
                  <Navbar.Link linkName="Resources" className="!py-0" />
                </Navbar.Container>
              </Navbar.Collapse>
              <Navbar.Container className="flex gap-1">
                <Navbar.Toggle className="block" />
                Menu
              </Navbar.Container> */}
              <Navbar.Container className="flex">
                <AccountDropdown user={adminData}>
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="profile picture"
                    />
                    <AvatarFallback>
                      {adminData?.email.split("")[0]}
                    </AvatarFallback>
                  </Avatar>
                </AccountDropdown>
              </Navbar.Container>
            </Navbar.Container>
          </Navbar>
        </div>
      </header>
    </React.Fragment>
  );
}

export default Header;
