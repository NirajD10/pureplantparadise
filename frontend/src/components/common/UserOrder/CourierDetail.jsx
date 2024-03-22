import React from "react";

function CourierDetail({courier_detail}) {
  return (
    <div className="px-8 py-4">
      <h3 className="font-bold text-xl my-3">Courier Detail</h3>
      <div>
        <div className="grid gap-4 grid-cols-[1fr_auto] space-y-2">
          <p className="font-normal">Carrier Name :</p>
          <p className="text-base font-light capitalize">{courier_detail.carrier_name}</p>
        </div>
        <div className="grid gap-4 grid-cols-[1fr_auto] space-y-2">
          <p className="font-normal">Tracking Number :</p>
          <p className="text-base font-light  capitalize">
            {courier_detail.tracking_number}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CourierDetail;
