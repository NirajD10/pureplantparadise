import React from "react";
import { useMediaQuery } from "@uidotdev/usehooks";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ShipmentTrackingModal from "./ShipmentTrackingModal";
import StatusModal from "./StatusModal";

function OrderDetailCard({
  orderlabelcontent,
  details,
  isCarrieravalible,
  refetchQuery,
}) {
  const isResponsive = useMediaQuery("only screen and (max-width: 992px)");

  return (
    <Card>
      <CardHeader className="space-y-4">
        <CardTitle>Order Detail #{details?.order_number}</CardTitle>
        <div>{orderlabelcontent}</div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            {details?.product_list.map((product) => (
              <TableRow key={product._id}>
                <TableCell className="w-[100px]">
                  <img
                    src={product?.productid.featuredimageUrl}
                    alt={product?.productid.productname}
                    className="w-[80px] h-[80px] sm:w-[68px] sm:h-[74px] rounded-sm border-[0.5px] border-slate-600"
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
                      {isResponsive ? (
                        <>
                          <li>
                            ₹{product?.productid.price} x {product?.quantity}
                          </li>
                          <li className="text-right font-bold">
                            ₹ {product?.quantity * product?.productid.price}
                          </li>
                        </>
                      ) : null}
                    </ul>
                  </div>
                </TableCell>
                {!isResponsive ? (
                  <>
                    <TableCell className="text-right text-base p-0">
                      ₹{product?.productid.price} x {product?.quantity}
                    </TableCell>
                    <TableCell className="text-right text-base p-0">
                      ₹ {product?.quantity * product?.productid.price}
                    </TableCell>
                  </>
                ) : null}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* <div className="pt-2 pl-2">
            <div className="grid mb-1 gap-4 grid-cols-[14rem_auto]">
              <span>Sub total</span>
              <div className="grid gap-4 grid-cols-[1fr_auto]">
                <p>2 items</p>
                <p>₹500</p>
              </div>
            </div>
            <div className="grid mb-1 gap-4 grid-cols-[14rem_auto]">
              <span>Discount</span>
              <div className="grid gap-4 grid-cols-[1fr_auto]">
                <p></p>
                <p>₹0.00</p>
              </div>
            </div>
          </div> */}
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
            <p className="text-base font-bold">₹{details?.total_cost}</p>
          </div>
        </div>
      </CardContent>
      <Separator />
      <div className="my-2 py-2 px-2">
        <div className="flex justify-end gap-2">
          {Object.keys(isCarrieravalible).length === 0 ? (
            <ShipmentTrackingModal
              orderid={details?._id}
              refetchQuery={refetchQuery}
            >
              <Button>Ship items</Button>
            </ShipmentTrackingModal>
          ) : null}
          <StatusModal orderid={details?._id} refetchQuery={refetchQuery}>
            <Button variant="outline">Edit</Button>
          </StatusModal>
        </div>
      </div>
    </Card>
  );
}

export default OrderDetailCard;
