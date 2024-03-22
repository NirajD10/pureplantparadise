import React, { useEffect } from "react";
import logo from "@/assets/LOGO.svg";
import AdminAuthForm from "./AdminAuthForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const navigate = useNavigate();
  const { user, isSuccess } = useSelector((state) => state.auth);

  useEffect(() => {
    /* to prevent user signed in to access admin auth page */
    if (user) {
      navigate("/");
    }
  }, [user, isSuccess, navigate]);

  return (
    <>
      <div className="container relative h-[100svh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-bgprimary" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="148"
              height="56"
              viewBox="0 0 148 56"
            >
              <image width="147" height="56" href={logo} />
            </svg>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Having indoor plants is like having little pockets of joy
                throughout your home.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
        <div className="p-6 lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="lg:hidden relative z-20 flex justify-center mb-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="140"
                height="60"
                viewBox="0 0 140 60"
              >
                <image width="140" height="60" href={logo} />
              </svg>
            </div>
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign in Admin Account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your login detail to access admin
              </p>
            </div>
            <AdminAuthForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthPage;
