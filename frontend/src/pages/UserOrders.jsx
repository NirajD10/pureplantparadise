import React, { useEffect, useState } from "react";

import UserTableComponent from "@/components/common/Table/main";
import { columns } from "@/components/common/UserOrder/Columns";
import { useSelector } from "react-redux";
import { queryClient } from "../lib/http";

function UserOrders() {
  const [orderlists, setOrderlists] = useState([]);
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    async function getUserOrdersList() {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_BACKEND}/orders`, {
        method: "POST",
        body: JSON.stringify({ userid: auth.user.id }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const data = await response.json();
      setOrderlists(data);
    }
    getUserOrdersList();
  }, []);

  return (
    <div className="w-full">
      <h3 className="text-lg font-bold my-4 text-center">Order History</h3>
      <UserTableComponent
        data={orderlists}
        columns={columns}
        filtertypename="order_number"
      />
    </div>
  );
}

export default UserOrders;

export function loader({ params }) {
  return queryClient.fetchQuery({
    queryKey: ["order-detail", { id: params.id }],
    queryFn: ({ signal }) =>
      fetchSingleUserOrderDetail({ id: params.id, signal }),
  });
}
