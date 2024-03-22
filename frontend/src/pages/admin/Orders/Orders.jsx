import React from "react";
import OrderTable from "@/components/admin/Orders/OrderTable";

function Orders() {
  return (
    <div className="w-full sm:h-full sm:flex-1 sm:flex-col sm:space-y-8 sm:p-8 sm:flex space-y-4 py-5">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Orders List</h2>
        </div>
      </div>
      <OrderTable/>
    </div>
  );
}

export default Orders;
