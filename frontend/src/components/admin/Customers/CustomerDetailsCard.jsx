import React, { useEffect, useState } from "react";

import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardDescription, CardTitle } from "@/components/ui/card";

let stringFallback;
let initialAvatarString;
let date;

function CustomerDetailsCard({ singleCustomerDetail }) {
  const [convertDate, setConvertDate] = useState();
  useEffect(() => {
    stringFallback = singleCustomerDetail.full_name.split(" ");
    initialAvatarString =
      stringFallback[0].charAt(0).toUpperCase() +
      stringFallback[1]?.charAt(0).toUpperCase();
    
    date = new Date(singleCustomerDetail.createdAt).toLocaleDateString();
    setConvertDate(date);
  }, []);

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarFallback>{initialAvatarString}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium leading-none">
            {singleCustomerDetail.full_name}
          </p>
          <p className="text-sm text-muted-foreground">
            {singleCustomerDetail.email}
          </p>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <div>
          <CardTitle className="text-sm">Full Name</CardTitle>
          <CardDescription>{singleCustomerDetail.full_name}</CardDescription>
        </div>
        <Separator className="my-1" />
        <div>
          <CardTitle className="text-sm">Email</CardTitle>
          <CardDescription>{singleCustomerDetail.email}</CardDescription>
        </div>
        <Separator className="my-1" />
        <div>
          <CardTitle className="text-sm">Phone No.</CardTitle>
          <CardDescription>
            {singleCustomerDetail?.phone_number
              ? singleCustomerDetail?.phone_number
              : "-"}
          </CardDescription>
        </div>
        {/* <Separator className="my-1" />
        <div>
          <CardTitle className="text-sm">Address</CardTitle>
          <CardDescription>
            {singleCustomerDetail.address.length > 0
              ? singleCustomerDetail.address[0]
              : "Not specified yet."}
          </CardDescription>
        </div> */}
        <Separator className="my-1" />
        <div>
          <CardTitle className="text-sm">Status</CardTitle>
          <CardDescription className="capitalize">
            {singleCustomerDetail.status}
          </CardDescription>
        </div>
        <Separator className="my-1" />
        <div>
          <CardTitle className="text-sm">Created At</CardTitle>
          <CardDescription>{convertDate}</CardDescription>
        </div>
      </div>
    </div>
  );
}

export default CustomerDetailsCard;
