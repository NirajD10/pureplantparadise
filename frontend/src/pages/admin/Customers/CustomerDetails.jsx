import React from "react";
import { Link, useParams } from "react-router-dom";
import { CaretCircleLeft } from "@phosphor-icons/react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CustomerDetailsCard from "@/components/admin/Customers/CustomerDetailsCard";
import CustomerOrderHistroyTable from "@/components/admin/Customers/CustomerOrderHistroyTable";
import { getSingleCustomerDetail } from "@/lib/admin-http";
import { useQuery } from "@tanstack/react-query";
import DestructiveCallout from "../../../components/Callout/DestructiveCallout";

function CustomerDetails() {
  const params = useParams();

  const {
    data: singleCustomerDetail,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["customer-detail", { id: params.customerid }],
    queryFn: ({ signal }) =>
      getSingleCustomerDetail({ id: params.customerid, signal }),
  });

  return (
    <div className="container my-8 px-3 py-3">
      <Link to=".." className="flex flex-row gap-2 items-center my-5">
        <CaretCircleLeft size={32} color="#121212" />
        <p className="font-normal text-xl">Back</p>
      </Link>
      {isLoading && <p className="text-xl">Loading...</p>}
      {isError && (
        <DestructiveCallout
          title="Something went wrong."
          message={error?.message}
        />
      )}
      {singleCustomerDetail && (
        <>
          <Card className="mb-10">
            <CardHeader>Customer Details</CardHeader>
            <CardContent className="grid gap-6">
              <CustomerDetailsCard
                singleCustomerDetail={singleCustomerDetail}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>Order History</CardHeader>
            <CardContent>
              <CustomerOrderHistroyTable orders={singleCustomerDetail.orders} />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

export default CustomerDetails;

// export function loader({ params }) {
//   return queryClient.fetchQuery({
//     queryKey: ["customer-detail", { id: params.customerid }],
//     queryFn: ({ signal }) => getSingleCustomerDetail({id: params.customerid, signal}),
//   });
// }
