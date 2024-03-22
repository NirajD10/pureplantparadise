import React, { useEffect } from "react";
import CustomerListTable from "@/components/admin/Customers/CustomerListTable";
import { queryClient } from "../../../lib/http";
import { getCustomerList } from "@/lib/admin-http";
import { useQuery } from "@tanstack/react-query";
import DestructiveCallout from "../../../components/Callout/DestructiveCallout";

function Customers() {
  const {
    data: customerlist,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["customers-list"],
    queryFn: getCustomerList,
  });

  return (
    <div className="sm:h-full sm:flex-1 sm:flex-col sm:space-y-8 py-5 sm:p-8 space-y-5">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Customers</h2>
        </div>
      </div>
      {isError && (
        <DestructiveCallout
          title="Failed to retrieve customers list"
          message={error?.info.message}
        />
      )}
      {customerlist && <CustomerListTable customerlist={customerlist} />}
    </div>
  );
}

export default Customers;

export function loader() {
  return queryClient.fetchQuery({
    queryKey: ["customers-list"],
    queryFn: getCustomerList,
  });
}
