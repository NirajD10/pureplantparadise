import React, { useState } from "react";


import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import LoginContent from "./LoginContent";
import RegisterContent from "./RegisterContent";

let content;

function AuthModal({ children }) {
  const [authmode, setAuthMode] = useState("login");

  const authClickHandler = () => {
    if (authmode === "login") {
      setAuthMode("register");
    } else {
      setAuthMode("login");
    }
  };

  if (authmode === "login") {
    content = <LoginContent />;
  } else {
    content = <RegisterContent />;
  }

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        {content}
        <Label htmlFor={authmode} className="text-base text-center">
          {authmode === "login" ? "New here? " : "Already have an account? "}
          {authmode === "login" ? (
            <p
              onClick={authClickHandler}
              className="inline text-bgsecondary underline underline-offset-4 cursor-pointer"
            >
              Create an account
            </p>
          ) : (
            <p
              onClick={authClickHandler}
              className="inline text-bgsecondary underline underline-offset-4 cursor-pointer"
            >
              Sign in
            </p>
          )}
        </Label>
      </DialogContent>
    </Dialog>
  );
}

export default AuthModal;
