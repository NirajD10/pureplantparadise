import React from "react";

import { getBadgeCompoents } from "@/util/badgeComponent";
import OrderDetailCard from "./OrderDetailCard";
import PaymentDetailCard from "./PaymentDetailCard";
import CarrierDetailCard from "./CarrierDetailCard";

let orderlabelcontent;
let paymentlabelcontent;

function OrderSection({
  order_detail,
  payment_detail,
  carrier_detail,
  refetchQuery,
}) {
  orderlabelcontent = getBadgeCompoents(order_detail?.status);
  paymentlabelcontent = getBadgeCompoents(payment_detail?.status);
  return (
    <div className="px-2 sm:px-8">
      <OrderDetailCard
        orderlabelcontent={orderlabelcontent}
        details={order_detail}
        isCarrieravalible={carrier_detail}
        refetchQuery={refetchQuery}
      />
      {Object.keys(carrier_detail).length !== 0 ? (
        <CarrierDetailCard carrier_detail={carrier_detail} />
      ) : null}
      <PaymentDetailCard
        paymentlabelcontent={paymentlabelcontent}
        details={payment_detail}
        refetchQuery={refetchQuery}
      />
    </div>
  );
}

export default OrderSection;
