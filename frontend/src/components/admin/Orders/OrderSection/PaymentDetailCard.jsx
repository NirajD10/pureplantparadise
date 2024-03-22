import React, { useRef } from "react";
import LoadingBar from "react-top-loading-bar";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PaymentInfoCard from "./PaymentInfoCard";

let paymentidcontent;

function PaymentDetailCard({ paymentlabelcontent, details,  refetchQuery }) {
  const loadingRef = useRef(null);

  function updateCodStatus() {
    const token = localStorage.getItem("admin-token")

    if(!token) {
      toast.error("Token Missing. Couldn't process it.")
    }
    fetch(`${import.meta.env.VITE_ADMIN_AUTH_API_URL}/orders/updatecodstatus/` + details?._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((resData) => {
        if (resData.status === 500 || resData.status === 404) {
          throw new Error(resData.message);
        } else if (resData.status === 422 || resData.status === 401) {
          throw new Error(resData.message);
        } else if (resData.status === 400) {
          throw new Error(resData.message);
        } else {
          toast.success(resData.message);
          loadingRef.current.complete();
          refetchQuery();
        }
      })
      .catch((error) => {
        loadingRef.current.complete();
        toast.error(error.message);
      });
  }
  return (
    <React.Fragment>
      <LoadingBar color="#003E29" ref={loadingRef} shadow={true} />
      <Card className="my-6">
        <CardHeader className="space-y-4">
          <CardTitle>
            <div className="flex flex-row justify-between">
              <span>
                Payment Detail (
                <span className="capitalize">{details?.type}</span>)
              </span>
              {details?.status !== "Paid" && details?.type === "cod" ? (
                <Button variant="outline" onClick={updateCodStatus}>
                  Capture
                </Button>
              ) : null}
            </div>
          </CardTitle>
          <CardDescription>{paymentlabelcontent}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="my-4 px-4 flex flex-col">
            <PaymentInfoCard title="Payment Method" data={details?.type} />
            <PaymentInfoCard
              title="Payment Gateway"
              data={details?.gateway ? details.gateway : "-"}
            />
            <PaymentInfoCard title="Status" data={details?.status} />
            {paymentidcontent}
            {details?.razorpay_payment ? (
              <PaymentInfoCard
                title="Payment ID"
                data={details?.razorpay_payment.payment_id}
              />
            ) : null}
            {details?.cod_id ? (
              <PaymentInfoCard title="Payment ID" data={details?.cod_id} />
            ) : null}
            <PaymentInfoCard title="Total Amount Paid" data={`₹${details?.amount}`} />
          </div>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

export default PaymentDetailCard;
