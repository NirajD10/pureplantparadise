import React from "react";
import { useDispatch } from "react-redux";

import { Button } from "@/components/ui/button";
import { Plus, Minus } from "@phosphor-icons/react";

import { NumberInput } from "keep-react";
import { cartReduxActions } from "../../../features/shop/cartSlices";

function QuantityInput({ quantity, id }) {
  const dispatch = useDispatch();

  const addProductQuantityHandler = (id) => {
    dispatch(cartReduxActions.modifycartItems({ _id: id, method: "add" }));
  };

  const cutProductQuantityHandler = (item) => {
    dispatch(cartReduxActions.modifycartItems({ _id: id, method: "cut" }));
  };
  return (
    <div className="w-fit flex items-center justify-center gap-2 space-x-2">
      <Button
        variant="outline"
        size="icon"
        className="h-7 w-7 shrink-0 rounded-full"
        onClick={() => cutProductQuantityHandler(id)}
        onMouseOver={({ target }) => (target.style.color = "white")}
        onMouseOut={({ target }) => (target.style.color = "#003E29")}
        disabled={quantity <= 1}
      >
        <Minus size={24} className="changeColor" />
      </Button>
      <div className="flex-1 text-center">
        <div className="text-lg font-bold tracking-tighter">
          {quantity ? quantity : 1}
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="h-7 w-7 shrink-0 rounded-full"
        onClick={() => addProductQuantityHandler(id)}
        onMouseOver={({ target }) => (target.style.color = "white")}
        onMouseOut={({ target }) => (target.style.color = "#003E29")}
      >
        <Plus size={24} className="changeColor" />
      </Button>
    </div>
  );
}

export default QuantityInput;
