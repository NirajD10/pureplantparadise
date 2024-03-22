import React from "react";
import { Truck } from "@phosphor-icons/react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const ProductInfoPanel = ({ sku, categories, delivery_message }) => {
  return (
    <div>
      <div className="flex flex-row gap-2 items-center my-6">
        <Truck size={20} color="#121212" />
        <p className="text-base font-light">
          {delivery_message}
        </p>
      </div>
      <Separator />
      <div className="flex flex-col gap-3 text-base font-light my-4">
        <p>SKU: {sku}</p>
        <p>
          Categories:{" "}
          {categories.map((category) => (
            <Link key={category.id} to={`/collections/${category.categoriesid}`}>
              {" "}
              <span className="underline underline-offset-4">{category.title}</span>
            </Link>
          ))}
        </p>
      </div>
    </div>
  );
};

export default ProductInfoPanel;
