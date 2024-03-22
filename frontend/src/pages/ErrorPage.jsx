import React from "react";
import errorimage from "@/assets/404.svg";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer/main";

function ErrorPage() {
  return (
    <>
    <Header />
    <div className="mx-auto w-full h-full my-14 flex justify-center">
      <img src={errorimage} height={380} width={650} alt="404" />
    </div>
    <Footer />
    </>
  );
}

export default ErrorPage;
