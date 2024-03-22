import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "@/context/search-context";

import { Navbar, TextInput } from "keep-react";

import {
  MagnifyingGlass,
  Heart,
  ShoppingCart,
  User,
  List,
} from "phosphor-react";

import logo from "@/assets/LOGO.png";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import SubMenu from "./Header_SubMenu/SubMenu";
import ResponsiveSubMenu from "./Header_SubMenu/ResponsiveSubMenu";
import CartModal from "./Cart/CartModal";
import AuthModal from "./AuthModal/AuthModal";
import CustomerNav from "./CustomerNav/CustomerNav";
import AccountDropdown from "../admin/Header/AccountDropdown";

function Header() {
  const [displayResSearchBar, setDisplayResSearchBar] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchCtx = useContext(SearchContext);
  const isResponsive = useMediaQuery("only screen and (max-width: 992px)");
  const { user } = useSelector((state) => state.auth);

  const displaySearchBar = () => {
    setDisplayResSearchBar((prev) => !prev);
  };

  const searchBarHandler = (e) => {
    // console.log(e.target.value);
    if (location.pathname === "/search") {
      searchCtx.setSearchTerm(e.target.value);
    } else {
      navigate("/search");
      searchCtx.setSearchTerm(e.target.value);
    }
  };

  return (
    <React.Fragment>
      <header className="sticky top-0 z-10">
        <div>
          <Navbar
            fluid={false}
            className="shadow-lg md:shadow-none !py-5 !px-2"
          >
            {isResponsive ? (
              <Navbar.Container className="flex items-center justify-between px-2">
                <Sheet>
                  <SheetTrigger>
                    <List size={26} />
                  </SheetTrigger>
                  <SheetContent side="left">
                    <div className="text-center mb-10">
                      {!user && (
                        <>
                          <Link
                            to="/login"
                            alt="Sign in account"
                            reloadDocument
                          >
                            <span className="text-base underline underline-offset-2 text-bgprimary">
                              Login
                            </span>
                          </Link>
                          <span className="text-base"> / </span>
                          <Link
                            to="/register"
                            alt="Create new account"
                            reloadDocument
                          >
                            <span className="text-base underline underline-offset-2 text-bgprimary">
                              Register
                            </span>
                          </Link>
                        </>
                      )}
                    </div>
                    <SheetHeader>
                      <p className="text-lg text-[#121212] mt-2 font-bold uppercase text-center">
                        Menu
                      </p>
                    </SheetHeader>
                    {/* Mobile Menu List */}
                    <ResponsiveSubMenu />
                  </SheetContent>
                </Sheet>
                <Navbar.Brand>
                  <Link to="/">
                    <img
                      src={logo}
                      alt="pureplantparadise Logo"
                      className="block w-[100px] h-[36px]"
                    />
                  </Link>
                </Navbar.Brand>
                <Navbar.Container className="flex items-center gap-6">
                  <Navbar.Container
                    tag="ul"
                    className="flex items-center justify-between gap-2"
                  >
                    {user ? <CustomerNav user={user} /> : null}
                    <div>
                      <MagnifyingGlass size={26} onClick={displaySearchBar} />
                    </div>
                    <Navbar.Link
                      icon={<ShoppingCart size={26} />}
                      iconAnimation={false}
                      href="/cart"
                    />
                  </Navbar.Container>
                </Navbar.Container>
              </Navbar.Container>
            ) : (
              <Navbar.Container className="flex items-center justify-between">
                <Navbar.Brand>
                  <Link to="/">
                    <img
                      src={logo}
                      alt="pureplantparadise Logo"
                      className="block w-[120px] h-[48px]"
                    />
                  </Link>
                </Navbar.Brand>

                <Navbar.Container className="flex items-center gap-6">
                  <Navbar.Container
                    tag="ul"
                    className="lg:flex hidden items-center justify-between gap-4"
                  >
                    <TextInput
                      id="#id-10"
                      placeholder="Search anything"
                      color="gray"
                      sizing="sm"
                      type="text"
                      addon={<MagnifyingGlass size={20} color="#5E718D" />}
                      handleOnChange={searchBarHandler}
                      addonPosition="left"
                    />
                    {user ? (
                      <CustomerNav user={user} />
                    ) : (
                      <AuthModal>
                        <User size={20} color="#444" />
                      </AuthModal>
                    )}
                    <CartModal />
                  </Navbar.Container>
                </Navbar.Container>
              </Navbar.Container>
            )}
          </Navbar>
          {isResponsive && displayResSearchBar ? (
            <Navbar className="bg-bgprimary">
              <Navbar.Container className="flex justify-center">
                <TextInput
                  id="search"
                  placeholder="Search anything"
                  color="gray"
                  sizing="md"
                  type="text"
                  addon={<MagnifyingGlass size={20} color="#5E718D" />}
                  handleOnChange={searchBarHandler}
                  addonPosition="left"
                />
              </Navbar.Container>
            </Navbar>
          ) : null}
        </div>
        {!isResponsive && (
          <div className="w-full h-12 bg-bgprimary py-[14px]">
            <SubMenu />
          </div>
        )}
      </header>
    </React.Fragment>
  );
}

export default Header;
