import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { cartReduxActions } from "@/features/shop/cartSlices";

import { Button } from "@/components/ui/button";
import { ShoppingBag } from "@phosphor-icons/react";
import ReviewsStar from "./ReviewsStar";

function SingleProductView({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addProducttoCart = (product) => {
    toast.custom((t) => (
      <div className="w-[23rem] inline-flex flex-col bg-bgprimary text-whiteprimary rounded-lg px-5 py-5 gap-2">
        <h3>Added Item to Cart</h3>
        <div className="flex flex-row gap-3">
          <div>
            <img
              className="w-[70px] h-[80px] bg-cover rounded-lg"
              src={product.featuredimageUrl}
              alt={product.productname}
            />
          </div>

          <div className="flex flex-col gap-2 px-2">
            <h4 className="text-lg">{product.productname}</h4>
            <p className="text-base">Quantity: {1}</p>
          </div>
        </div>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-whiteprimary text-bgsecondary py-2 font-normal"
          onClick={() => navigate("/cart")}
        >
          View Cart
        </button>
      </div>
    ));
    dispatch(
      cartReduxActions.addItemstoCart({
        _id: product._id,
        featuredimageUrl: product.featuredimageUrl,
        productname: product.productname,
        price: product.price,
        quantity: 1,
      })
    );
  };
  return (
    <div
      key={product?._id}
      className="flex flex-col justify-between rounded-xl md:rounded-2xl py-3 px-2 sm:px-0 mb-2 flex-shrink-0 cursor-pointer group/parent overflow-hidden"
    >
      <Link reloadDocument to={`/products/${product?._id}`}>
        <img
          src={product?.featuredimageUrl}
          loading="lazy"
          alt={product?.productname}
          className="w-48 sm:w-[260px] bg-slate-300 h-48 sm:h-64 rounded-2xl object-cover group-hover/parent:scale-105 transition duration-500"
        />
        <ReviewsStar />
        <div className="flex flex-col my-3">
          <p className="text-base sm:text-lg font-normal my-2 hover:text-bgsecondary transition line-clamp-2">
            {product?.productname}
          </p>
          <div className="flex flex-row gap-2">
            <p className="text-xl sm:text-2xl font-bold">
              {"₹" + product?.price}
            </p>
            <p className="text-xl sm:text-2xl font-bold text-[#CCCCCC] text-opacity-70 line-through">
              {product?.oldprice !== undefined && product?.oldprice !== null
                ? "₹" + product?.oldprice
                : ""}
            </p>
          </div>
        </div>
      </Link>
      <Button
        variant="outline"
        className="w-full group/button !rounded-xl"
        onClick={() => addProducttoCart(product)}
      >
        <ShoppingBag
          size={20}
          className="text-[#003E29] group-hover/button:text-[#FAFAFA]"
        />
        <span className="ml-1 text-[#003E29] group-hover/button:text-[#FAFAFA]">
          Add to cart
        </span>
      </Button>
    </div>
  );
}

export default SingleProductView;
