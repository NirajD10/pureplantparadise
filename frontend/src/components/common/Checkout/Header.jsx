import React from "react";

import logo from "@/assets/LOGO.png";
import { Link } from "react-router-dom";
import { ShoppingCart } from "@phosphor-icons/react";

function Header() {
  return (
    <div className="px-6 lg:px-2 py-4 my-4 border-b-[0.5px] border-b-green-950 border-opacity-25">
      <header className="container w-full flex flex-row justify-between">
        <div>
          <Link to="/">
            <img
              src={logo}
              alt="pureplantparadise Logo"
              className="block w-[128px] h-[54px]"
            />
          </Link>
        </div>
        <div className="my-auto">
          <Link to="/cart">
            <ShoppingCart size={32} color="#121212" />
          </Link>
        </div>
      </header>
    </div>
  );
}

export default Header;
