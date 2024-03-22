import React from "react";

import { CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function UserDetail({ info }) {
  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-20 sm:space-y-0 mb-10">
      <div className="space-y-2">
        <CardTitle className="text-base font-bold my-3">
          Contact Information
        </CardTitle>
        <div>
          <CardTitle className="text-sm font-bold">Email:</CardTitle>
          <CardDescription>{info?.email}</CardDescription>
        </div>
        <div>
          <CardTitle className="text-sm font-bold">Phone no:</CardTitle>
          <CardDescription>{info?.phoneno}</CardDescription>
        </div>
      </div>

      <div>
        <CardTitle className="text-base font-bold my-1 sm:my-3">
          Shipping Address
        </CardTitle>
        <div className="text-sm text-muted-foreground">
          <p>{info?.shipping_address.full_name},</p>
          <p className="text-wrap">{info?.shipping_address.address},</p>
          <p>
            {info?.shipping_address.city}, {info?.shipping_address.state}
          </p>
          <p>{info?.shipping_address.country}</p>
          <p>{info?.shipping_address.zip}</p>
        </div>
      </div>

      <div>
        <CardTitle className="text-base font-bold my-1 sm:my-3">
          Billing Address
        </CardTitle>
        <div className="text-sm text-muted-foreground">
          <p>{info?.billing_address.full_name},</p>
          <p className="text-wrap">{info?.billing_address.address},</p>
          <p>
            {info?.billing_address.city}, {info?.billing_address.state}
          </p>
          <p>{info?.billing_address.country}</p>
          <p>{info?.billing_address.zip}</p>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
