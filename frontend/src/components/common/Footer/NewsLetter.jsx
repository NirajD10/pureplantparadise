import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function NewsLetter() {
  return (
    <div className="col-span-2 flex flex-col justify-center items-center">
      <p className="text-whiteprimary font-normal text-sm text-center mt-4">
        Join news update
      </p>
      <h4 className="text-whiteprimary font-bold text-3xl leading-tight mt-2 mb-3">
        Sign up to Newsletter
      </h4>
      <div className="flex w-full max-w-sm items-center my-4">
        <Input type="email" className="rounded-r-none" placeholder="Email" />
        <Button
          variant="secondary"
          className="rounded-none rounded-r-lg text-whiteprimary"
          type="submit"
        >
          Subscribe
        </Button>
      </div>
    </div>
  );
}

export default NewsLetter;
