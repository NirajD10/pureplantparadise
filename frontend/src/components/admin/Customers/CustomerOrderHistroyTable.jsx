import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";

function CustomerOrderHistroyTable({ orders }) {
  const [formatDate, setFormatDate] = useState();
  useEffect(() => {
    const date = new Date(orders.createdAt).toLocaleDateString();
    setFormatDate(date);
  }, []);
  return (
    <Table>
      <TableCaption>A list of customer order histroy.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Order Id</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Order Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* TODO: Update order details from api */}
        {orders.map((order) => (
          <TableRow>
            <TableCell className="font-medium">
              <Link
                to={`/admin/orders/edit/${order._id}`}
                className="underline text-bgsecondary"
              >
                #{order.order_number}
              </Link>
            </TableCell>
            <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
            <TableCell className="capitalize">{order.status}</TableCell>
            <TableCell className="text-right">₹{order.amount}</TableCell>
          </TableRow>
        ))}
        {orders.length === 0 ? (
          <TableRow>
            <p className="text-center w-full">No orders yet.</p>
          </TableRow>
        ) : null}
      </TableBody>
    </Table>
  );
}

export default CustomerOrderHistroyTable;
