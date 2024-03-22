import React, { useEffect, useState } from "react";
import { columns } from "@/components/admin/Orders/Columns";
import TableComponent from "../Table/main";

function OrderTable() {
  const [orderlist, setOrderslist] = useState([]);

  useEffect(() => {
    async function getOrders() {
      const token = localStorage.getItem("admin-token");
      if(!token) {
        toast.error("Token Missing. Couldn't process it.")
      }
      
      const response = await fetch(
        `${import.meta.env.VITE_ADMIN_AUTH_API_URL}orders`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const ordersdata = await response.json();
      setOrderslist(ordersdata);
    }

    getOrders();
  }, []);
  return (
    <>
      <TableComponent
        data={orderlist}
        columns={columns}
        filtertypename="order_number"
      />
    </>
  );
}

export default OrderTable;
