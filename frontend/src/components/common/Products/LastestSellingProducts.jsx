import React, { useContext } from "react";
import HeadingTitle from "../HeadingTitle";
import SingleProductView from "./SingleProductView";
import { ShopContext } from "@/context/shop-context";

import { Separator } from "@/components/ui/separator";

function LastestSellingProducts() {
  const shopctx = useContext(ShopContext);

  return (
    <div className="my-5">
      <HeadingTitle subtitle="Selling" title="New Arrivals" />
      <Separator className="mb-5" />
      <div className="h-fit flex overflow-x-auto space-x-2">
        {shopctx.data?.latestProduct.map((product) => (
          <SingleProductView key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default LastestSellingProducts;
