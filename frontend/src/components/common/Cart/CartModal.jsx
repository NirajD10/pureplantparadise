import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { cartReduxActions } from "@/features/shop/cartSlices";

import QuantityInput from "../Products/QuantityInput";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { ShoppingCart, Trash } from "phosphor-react";

function CartModal() {
  const [ototalprice, setototalprice] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartdata = useSelector((state) => state.cart.items);

  const cartrouteHandler = () => {
    navigate("/cart");
  };

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
  }, [overallTotal, cartdata]);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default">
          <ShoppingCart size={20} color="#FAFAFA" />
          <span className="ml-1 text-[#FAFAFA]">Cart ₹{ototalprice}</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[600px] flex flex-col">
        <SheetHeader>
          <SheetTitle className="my-2">Shopping Cart</SheetTitle>
          <Separator />
          <SheetDescription asChild="true">
            <div className="px-2 w-full">
              {cartdata.length === 0 && (
                <p className="text-center w-full">Your Cart is empty.</p>
              )}
            </div>
          </SheetDescription>
        </SheetHeader>
        <div className="overflow-y-auto flex-auto">
          {cartdata.map((item) => (
            <React.Fragment key={item._id}>
              <div className="w-full grid  grid-cols-3 gap-3 py-2">
                <img
                  src={item.featuredimageUrl}
                  alt={item.productname}
                  loading="lazy"
                  className="w-[120px] h-[100px] bg-contain rounded-lg"
                />
                <div className="col-span-2 flex flex-row gap-2">
                  <div className="flex flex-col justify-start gap-3">
                    <p
                      htmlFor="product_title"
                      className="text-lg font-normal"
                    >
                      {item.productname}
                    </p>
                    <p
                      htmlFor="product_price"
                      className="text-lg font-bold text-bgprimary"
                    >
                      ₹{item.price * item.quantity}
                    </p>
                    <QuantityInput quantity={item.quantity} id={item._id} />
                  </div>
                  <div className="w-fit flex justify-center items-start ">
                    <button
                      onClick={() =>
                        dispatch(cartReduxActions.removeCartItems(item._id))
                      }
                    >
                      <Trash size={24} color="#121212" />
                    </button>
                  </div>
                </div>

                <Separator className="opacity-20" />
              </div>
            </React.Fragment>
          ))}
        </div>
        {cartdata.length > 0 && (
          <SheetFooter className="mb-auto flex !flex-col justify-start gap-3">
            <div className="flex flex-row justify-between">
              <Label
                htmlFor="product_subtotal_title"
                className="font-bold text-xl"
              >
                Subtotal :
              </Label>
              <Label
                htmlFor="product_subtotal_price"
                className="font-bold text-xl"
              >
                ₹{ototalprice}
              </Label>
            </div>
            <SheetClose
              className="w-full flex flex-col gap-2 -translate-x-2"
              asChild="true"
            >
              <Button
                onClick={cartrouteHandler}
                className="w-full text-whiteprimary bg-[#121212] hover:bg-[#121212] rounded-full"
              >
                View Cart
              </Button>
            </SheetClose>
            <SheetClose
              className="w-full flex flex-col gap-2 -translate-x-2"
              asChild="true"
            >
              <Button className="w-full rounded-full" onClick={() => navigate("/checkout", { replace: true })}>Checkout</Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default CartModal;
