import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function CarrierDetailCard({ carrier_detail }) {
  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle>Carrier Detail</CardTitle>
      </CardHeader>
      <CardContent>
      <div className="grid gap-4 grid-cols-[1fr_auto] space-y-2">
        <p className="font-bold">Carrier Name :</p>
        <p className="text-base capitalize">{carrier_detail.carrier_name}</p>
      </div>
      <div className="grid gap-4 grid-cols-[1fr_auto] space-y-2">
        <p className="font-bold">Tracking Number :</p>
        <p className="text-base capitalize">{carrier_detail.tracking_number}</p>
      </div>
      </CardContent>
    </Card>
  );
}

export default CarrierDetailCard;
