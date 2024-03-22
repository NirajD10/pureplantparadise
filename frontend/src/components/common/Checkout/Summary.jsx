import React, { useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { useDispatch } from "react-redux";
import { checkoutReduxActions } from "@/features/shop/checkoutSlices.js";

// eslint-disable-next-line react/prop-types
function Summary({ items }) {
  const [total, setTotal] = useState({
    totalprice: 0,
    totalqty: 0,
  });
  const isResponsive = useMediaQuery("only screen and (max-width: 992px)");
  const dispatch = useDispatch();

  const overallTotal = useCallback(() => {
    if (items?.length > 0) {
      let totalEachPriceProduct = items.map(
        (item) => item.quantity * item.price
      );
      let totalPrice = totalEachPriceProduct.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      );

      let totalEachQt = items.map((item) => item.quantity);
      let totalQty = totalEachQt.reduce(
        (accumulator, currectValue) => accumulator + currectValue
      );

      return { totalprice: totalPrice, totalqty: totalQty };
    }
    return 0;
  }, [items]);

  useEffect(() => {
    setTotal(overallTotal);
    dispatch(
      checkoutReduxActions.updateItemAmountandQty({
        totalamount: overallTotal().totalprice,
        totalqty: overallTotal().totalqty,
      })
    );
  }, [overallTotal, items]);

  return (
    <React.Fragment>
      <div className="pl-3">
        {!isResponsive && (
          <React.Fragment>
            <Table className="my-5">
              <TableBody>
                {items?.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell className="w-[120px]">
                      <img
                        src={item.featuredimageUrl}
                        alt={item.productname}
                        className="w-20 h-20 rounded-sm border-[0.5px] border-slate-600"
                      />
                    </TableCell>
                    <TableCell colSpan={3}>
                      <div>
                        <p className="text-lg font-bold">{item.productname}</p>
                      </div>
                      <div>
                        <ul className="list-none my-2">
                          <li className="text-base">
                            Quantity: {item.quantity}
                          </li>
                        </ul>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-base p-0">
                      ₹ {item.quantity * item.price}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Separator />
            <div className="pt-2 pl-2">
              <div className="grid mb-1 gap-4 grid-cols-[14rem_auto]">
                <span>Sub total</span>
                <div className="grid gap-4 grid-cols-[1fr_auto]">
                  <p>{total.totalqty} items</p>
                  <p>₹{total.totalprice}</p>
                </div>
              </div>
              <div className="grid mb-1 gap-4 grid-cols-[14rem_auto]">
                <span>Discount</span>
                <div className="grid gap-4 grid-cols-[1fr_auto]">
                  <p></p>
                  <p>₹0.00</p>
                </div>
              </div>
            </div>
            <Separator />
          </React.Fragment>
        )}
        <div className="my-4 p-2 lg:pt-4 lg:pl-2 flex justify-between">
          <div className="grid gap-4 grid-cols-[1fr_auto]">
            <div>
              <p className="font-bold text-base">Total</p>
              {/*<p className="text-base italic">(Inclusive of tax ₹0.00)</p>*/}
              <p></p>
            </div>
          </div>
          <div className="grid gap-4 grid-cols-[1fr_auto]">
            <p></p>
            <p className="text-xl font-bold">₹{total.totalprice}</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Summary;
