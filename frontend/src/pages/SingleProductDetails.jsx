import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { getSingleProductDetails, queryClient } from "../lib/http";
import { cartReduxActions } from "../features/shop/cartSlices";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heart } from "@phosphor-icons/react";

import SingleProductCarousel from "../components/common/CarouselSlider/SingleProductCarousel";
import ReviewsStar from "../components/common/Products/ReviewsStar";
import QuantityInput from "../components/common/Products/QuantityInput";
import ProductInfoPanel from "../components/common/Products/ProductInfoPanel";
import HeadingTitle from "../components/common/HeadingTitle";
import SingleProductView from "../components/common/Products/SingleProductView";
import ProductTabsPanel from "../components/common/Products/ProductTabsPanel";
import { toast } from "sonner";

function SingleProductDetails() {
  const { productname } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product-detail", { productname: productname }],
    queryFn: ({ signal }) => getSingleProductDetails({ productname, signal }),
  });

  useEffect(() => {
    if (isError && error?.response.status === 404) {
      navigate("/error");
    }
  }, [isError, error]);

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
    <div>
      {isLoading && (
        <div className="w-full h-[80svh] flex justify-center items-center">
          <span className="loader"></span>
        </div>
      )}
      {product && (
        <React.Fragment>
          <div className="container my-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 mt-12">
              <SingleProductCarousel
                media={product?.singleProduct.productdetails.mediaurl}
                alt={product?.singleProduct.productname}
              />
              <div className="px-4 lg:pl-10">
                <h2 className="text-5xl sm:text-8xl font-bold text-[#121212] mb-3">
                  {product?.singleProduct.productname}
                </h2>
                <div className="flex flex-row justify-between">
                  <ReviewsStar />
                </div>
                <span className="text-xl text-bgprimary">
                  ₹
                  <p className="ml-1 inline-block text-7xl text-bgprimary font-normal">
                    {product?.singleProduct.price}
                  </p>
                </span>
                <p className="my-8 font-light text-base">
                  {product?.singleProduct.productdetails.short_description}
                </p>
                <div className="flex items-center my-5">
                  <Button
                    onClick={() => addProducttoCart(product?.singleProduct)}
                    className="w-full rounded-3xl bg-[#121212]"
                  >
                    Add to Cart
                  </Button>
                </div>
                <ProductInfoPanel
                  sku={product?.singleProduct.sku}
                  categories={product?.singleProduct.categories}
                  delivery_message={product?.shopdetail.delivery_message}
                />
              </div>
            </div>
          </div>
          <Separator />
          {/* Tabs  */}
          <div className="my-12 container px-4 md:px-0">
            <ProductTabsPanel
              description={product?.singleProduct.productdetails.description}
              reviews={product?.singleProduct.ratingstar}
            />
          </div>
          <Separator />
          {/* Related Products list */}
          <div className="my-12 container">
            <HeadingTitle title="Related Product" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-2 md:px-8 sm:gap-2">
              {product?.relatedproduct.map((rProduct) => (
                <SingleProductView key={rProduct._id} product={rProduct} />
              ))}
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default SingleProductDetails;

export function loader({ params }) {
  return queryClient.fetchQuery({
    queryKey: ["product-detail", { productname: params.productname }],
    queryFn: ({ signal }) =>
      getSingleProductDetails({ productname: params.productname, signal }),
  });
}
