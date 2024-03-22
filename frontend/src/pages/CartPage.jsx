import { Fragment, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import CartTable from "../components/common/Cart/CartTable";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function CartPage() {
  const navigate = useNavigate();
  const [ototalprice, setototalprice] = useState(0);
  const cartdata = useSelector((state) => state.cart.items);

  const overallTotal = useCallback(() => {
    if (cartdata.length > 0) {
      let totalEachPriceProduct = cartdata.map(
        (item) => item.quantity * item.price
      );

      let totalPrice = totalEachPriceProduct.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      );
      return totalPrice;
    }
    return 0;
  }, [cartdata]);

  useEffect(() => {
    setototalprice(overallTotal);
  }, [overallTotal]);

  return (
    <div className="container my-12">
      <h2 className="font-normal text-5xl underline decoration-slate-600/30 underline-offset-8 text-center my-10 ">
        Your Cart
      </h2>
      <CartTable cartdata={cartdata} />
      {cartdata.length !== 0 ? (
        <Fragment>
          <div className="flex flex-row justify-center md:justify-end gap-2 mb-12">
            {/* <div className="p-5">
              <p className="text-base font-light">Add a order note:</p>
              <Textarea />
            </div> */}
            <div className="md:col-span-2 flex flex-col items-center p-5">
              <div className="flex flex-row justify-around w-full my-5">
                <p className="text-2xl">Subtotal</p>
                <p className="text-2xl font-Normal text-bgprimary">
                  ₹{ototalprice}
                </p>
              </div>
              <p className="text-sm font-light mb-2">
                Taxes and shipping calculated at checkout
              </p>
              <Button
                className="w-full bg-bgprimary rounded-full text-whiteprimary"
                onClick={() => navigate("/checkout", { replace: true })}
              >
                Checkout
              </Button>
            </div>
          </div>
        </Fragment>
      ) : <div className="h-[10vh]"></div>}
    </div>
  );
}

export default CartPage;
