import React from "react";
import HeadingTitle from "../HeadingTitle";
import SingleProductView from "./SingleProductView";

import { Separator } from "@/components/ui/separator"

function BestSellingProducts() {
  return (
    <div className="my-5">
      <HeadingTitle subtitle="The" title="Best Selling Products" />
      <Separator className="mb-5" />
      <SingleProductView />
    </div>
  );
}

export default BestSellingProducts;
