import React, { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { toast } from "sonner";

function Profile() {
  const [userdata, setUserdata] = useState(null);
  const [dateformat, setDateformat] = useState();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    async function getUserOrdersList() {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND}/auth/profile/${auth.user.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        const data = await response.json();
        setUserdata(data);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getUserOrdersList();
  }, []);

  useEffect(() => {
    if (userdata) {
      const date = new Date(userdata.createdAt);
      const dd = date.getDay();
      const mm = date.getMonth() + 1;
      const year = date.getFullYear();
      setDateformat(`${dd}/${mm}/${year}`);
    }
  }, [userdata]);

  return (
    <div className="my-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-center sm:text-left">
            Account Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="lg:p-4 flex flex-col items-center lg:flex-row lg:justify-items-start lg:items-start gap-5">
            <div className="w-fit">
              <Avatar className="w-16 h-16 sm:w-20 sm:h-20">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="w-full flex flex-col gap-3 lg:flex-row lg:justify-around lg:gap-0">
              <div className="my-3 w-fit space-y-1">
                <p className="text-lg font-bold underline underline-offset-2 decoration-bgsecondary">
                  Full Name:
                </p>
                <p className="text-lg text-muted-foreground">
                  {userdata?.full_name}
                </p>
              </div>
              <div className="my-3 w-fit space-y-1">
                <p className="text-lg font-bold underline underline-offset-2 decoration-bgsecondary">
                  Email:
                </p>
                <p className="text-lg text-muted-foreground">
                  {userdata?.email}
                </p>
              </div>
              <div className="my-3 w-fit space-y-1">
                <p className="text-lg font-bold underline underline-offset-2 decoration-bgsecondary">
                  Status:
                </p>
                <p className="text-lg text-muted-foreground capitalize">
                  {userdata?.status}
                </p>
              </div>
              <div className="my-3 w-fit space-y-1">
                <p className="text-lg font-bold underline underline-offset-2 decoration-bgsecondary">
                  Created account:
                </p>
                <p className="text-lg text-muted-foreground">{dateformat}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Profile;
