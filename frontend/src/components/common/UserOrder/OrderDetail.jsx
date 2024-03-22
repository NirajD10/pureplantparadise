import React from "react";
import { useMediaQuery } from "@uidotdev/usehooks"; 

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

import { getBadgeCompoents } from "@/util/badgeComponent";
import CourierDetail from "./CourierDetail";
import UserDetail from "./UserDetail";
import PaymentDetail from "./PaymentDetail";

let orderlabelcontent;
let paymentlabelcontent;

function OrderDetail({ detail }) {
  const isResponsive = useMediaQuery("only screen and (max-width: 992px)");
  const { customerdetail, order_detail, carrier_detail, payment_detail } =
    detail;
  orderlabelcontent = getBadgeCompoents(order_detail?.status);
  paymentlabelcontent = getBadgeCompoents(payment_detail?.status);

  return (
    <div className="lg:px-8">
      <Card>
        <CardHeader className="space-y-4">
          <CardTitle>Order #{order_detail?.order_number}</CardTitle>
          <div>{orderlabelcontent}</div>
        </CardHeader>
        <CardContent>
          <UserDetail info={customerdetail} />
          <Separator />
          <Table>
            <TableBody>
              {order_detail?.product_list.map((product) => (
                <TableRow key={product._id}>
                  <TableCell className="w-[100px]">
                    <img
                      src={product?.productid.featuredimageUrl}
                      alt={product?.productid.productname}
                      className="w-[75px] h-[82px] sm:w-[68px] sm:h-[74px] rounded-sm border-[0.5px] border-slate-600"
                    />
                  </TableCell>
                  <TableCell colSpan={2}>
                    <div>
                      <p className="text-base font-bold">
                        {product?.productid.productname}
                      </p>
                    </div>
                    <div>
                      <ul className="list-none my-2">
                        <li className="text-sm font-bold">
                          SKU:{" "}
                          <span className="!font-normal">
                            {product?.productid.sku}
                          </span>
                        </li>
                        <li className="text-sm font-bold">
                          Quantity:{" "}
                          <span className="!font-normal">
                            {product?.quantity}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </TableCell>
                  {!isResponsive && <TableCell className="text-right text-base p-0">
                   <p> ₹{product?.productid.price} x {product?.quantity}</p>
                  </TableCell>}
                  <TableCell className="sm:text-right text-base p-0">
                    ₹{product?.quantity * product?.productid.price}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Separator />
          <div className="my-4 pl-4 flex justify-between">
            <div className="grid gap-4 grid-cols-[1fr_auto]">
              <div>
                <p className="font-bold text-base">Total</p>
                {/*<p className="text-base italic">(Inclusive of tax ₹0.00)</p>*/}
                <p></p>
              </div>
            </div>
            <div className="grid gap-4 grid-cols-[1fr_auto]">
              <p></p>
              <p className="text-base font-bold">₹{order_detail?.total_cost}</p>
            </div>
          </div>
          {/* Customer order note */}
          <div className="my-6 flex flex-end gap-2 justify-center">
            <CardTitle className="text-sm font-bold">Notes:</CardTitle>
            <CardDescription>{order_detail?.notes}</CardDescription>
          </div>
        </CardContent>
        <Separator />
        {/* Courier details */}
        {Object.keys(carrier_detail).length !== 0 ? (
          <CourierDetail courier_detail={carrier_detail} />
        ) : null}
      </Card>
      {/* Payment details */}
      <PaymentDetail
        paymentlabel={paymentlabelcontent}
        detail={payment_detail}
      />
    </div>
  );
}

export default OrderDetail;
