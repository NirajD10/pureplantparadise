import React from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import PaymentInfoCard from "@/components/admin/Orders/OrderSection/PaymentInfoCard";

function PaymentDetail({ paymentlabel, detail }) {
  return (
    <Card className="my-8">
      <CardHeader className="space-y-4">
        <CardTitle>Payment</CardTitle>
        <div>{paymentlabel}</div>
      </CardHeader>
      <CardContent>
        <div className="my-4 px-4 flex flex-col">
          <PaymentInfoCard title="Payment Method" data={detail?.type} />
          <PaymentInfoCard
            title="Payment Gateway"
            data={detail?.gateway ? detail.gateway : "-"}
          />
          <PaymentInfoCard title="Status" data={detail?.status} />
          {/* {paymentidcontent} */}
          {detail?.razorpay_payment ? (
            <PaymentInfoCard
              title="Payment ID"
              data={detail?.razorpay_payment.payment_id}
            />
          ) : null}
          {detail?.cod_id ? (
            <PaymentInfoCard title="Payment ID" data={detail?.cod_id} />
          ) : null}
          <PaymentInfoCard title="Total Amount Paid" data={`₹${detail?.amount}`} />
        </div>
      </CardContent>
    </Card>
  );
}

export default PaymentDetail;
