import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import OrderDetail from "../components/common/UserOrder/OrderDetail";
import { fetchSingleUserOrderDetail } from "@/lib/http";
import { toast } from "sonner";

function UserOrderDetails() {
  const { id } = useParams();
  const {
    data: singleOrderDetail,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["order-detail", { id: id }],
    queryFn: ({ signal }) => fetchSingleUserOrderDetail(id, signal),
    staleTime: 1000,
  });

  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
  }, [isError, error]);

  return (
    <div className="sm:container">
      {isPending && (
        <div className="h-[50svh] w-full flex">
          <span className="loader"></span>
        </div>
      )}
      {singleOrderDetail !== undefined && (
        <OrderDetail detail={singleOrderDetail} />
      )}
    </div>
  );
}

export default UserOrderDetails;
