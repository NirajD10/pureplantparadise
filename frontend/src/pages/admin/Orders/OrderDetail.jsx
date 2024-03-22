import React, { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoadingBar from "react-top-loading-bar";

import OrderSection from "@/components/admin/Orders/OrderSection/index";
import CustomerSection from "@/components/admin/Orders/CustomerSection";

import { CaretCircleLeft } from "@phosphor-icons/react";
import { getSingleOrderDetail } from "@/lib/admin-http";

function OrderDetail() {
  const { id } = useParams();
  const loadingRef = useRef(null);
  const {
    data: orderdetail,
    isPending,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ["order-details", { id: id }],
    queryFn: ({ signal }) => getSingleOrderDetail(id, signal),
    staleTime: 1000,
  });

  useEffect(() => {
    if (isPending) {
      loadingRef.current.continuousStart();
    }

    if (orderdetail) {
      loadingRef.current.complete();
    }
  }, [orderdetail, isPending]);

  return (
    <div className="container my-12">
      <LoadingBar color="#003E29" ref={loadingRef} shadow={true} />
      {isPending && (
        <div className="h-[80svh] w-full flex flex-col justify-center items-start">
          <span className="loader"></span>
        </div>
      )}
      {orderdetail ? (
        <React.Fragment>
          <Link to=".." className="flex flex-row gap-2 items-center my-5">
            <CaretCircleLeft size={32} color="#121212" />
            <p className="font-normal text-xl">
              Viewing Order #{orderdetail?.order_detail.order_number}
            </p>
          </Link>
          <main className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <OrderSection
                order_detail={orderdetail?.order_detail}
                payment_detail={orderdetail?.payment_detail}
                carrier_detail={orderdetail?.carrier_detail}
                refetchQuery={refetch}
              />
            </div>
            <div className="space-y-3">
              <CustomerSection customer_detail={orderdetail?.customerdetail} />
            </div>
          </main>
        </React.Fragment>
      ) : null}
    </div>
  );
}

export default OrderDetail;
