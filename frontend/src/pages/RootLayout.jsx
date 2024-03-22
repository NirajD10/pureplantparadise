import React from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer/main";
import SearchProvider from "../context/search-context";

function RootLayout() {
  return (
    <>
      <SearchProvider>
        <Header />
        <Outlet />
        <Footer />
      </SearchProvider>
    </>
  );
}

export default RootLayout;
