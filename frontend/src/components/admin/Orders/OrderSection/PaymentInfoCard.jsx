import React from "react";

function PaymentInfoCard({ title, data, key }) {
  return (
    <React.Fragment key={key}>
      <div className="sm:grid sm:gap-4 sm:grid-cols-[1fr_auto] sm:space-y-2">
        <p className="font-bold">{title} :</p>
        <p className="text-base capitalize mb-4 sm:mb-0">{data}</p>
      </div>
    </React.Fragment>
  );
}

export default PaymentInfoCard;
