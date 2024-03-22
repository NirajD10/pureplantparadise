import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";

import { urlReduxActions } from "../../../features/site/urlSlices";

import { ListDashes } from "@phosphor-icons/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

let isInitilized = false;

function ProductsFilter({ attributes, maxPrice, refetchProductList }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const { urlParamsData, minlocalPrice, maxlocalPrice } = useSelector(
    (state) => state.urlModify
  );
  let [searchParams, setSearchParams] = useSearchParams();
  const [rangeValue, setRangeValue] = useState(
    minlocalPrice !== 0 || maxlocalPrice !== 0
      ? [minlocalPrice, maxlocalPrice]
      : [0, maxPrice]
  );

  useEffect(() => {
    isInitilized = true;
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (urlParamsData.length === 0) {
      for (const key of searchParams.keys()) {
        if (key === "sortBy") {
          continue;
        } else if (key === "minPrice") {
          continue;
        } else if (key === "maxPrice") {
          continue;
        }
        searchParams.delete(key);
        refetchProductList();
      }
      setSearchParams(searchParams);
    } else {
      urlParamsData.map((params) => {
        searchParams.set(Object.keys(params), Object.values(params));
        setSearchParams(searchParams);
      });
      refetchProductList();
    }
  }, [location.search, urlParamsData, minlocalPrice, maxlocalPrice]);

  const updateUrlParams = (attribute_code, item_value, checked) => {
    if (checked) {
      dispatch(
        urlReduxActions.addurlparams({
          attribute_code: attribute_code,
          item_value: item_value,
        })
      );
      refetchProductList();
    } else {
      dispatch(
        urlReduxActions.removeurlparams({
          attribute_code: attribute_code,
          item_value: item_value,
        })
      );
      refetchProductList();
    }
  };

  return (
    <div className="border border-[#121212] border-opacity-10 rounded-lg py-2 px-4 mb-2">
      <div className="flex flex-row justify-between my-2">
        <div className="flex flex-row items-center">
          <ListDashes size={22} color="#003e29" />
          <p className="ml-2 font-bold text-base uppercase text-bgprimary">
            {/* eslint-disable-next-line react/prop-types */}
            Filter ({attributes?.length > 0 ? attributes?.length + 1 : 0})
          </p>
        </div>
        {/* <p
          className="font-light text-base uppercase underline cursor-pointer"
          onClick={() => {
            dispatch(urlReduxActions.reseturlparams());
            setRangeValue([0, maxPrice]);
            setIsFilterCleared(true);
          }}
        >
          Reset all
        </p> */}
      </div>
      <div className="flex flex-col gap-2">
        <Accordion type="multiple" collapsible="true">
          {typeof maxPrice === "number" ? (
            <AccordionItem key="price" value="price">
              <AccordionTrigger>Price</AccordionTrigger>
              <AccordionContent className="rounded-lg p-3 my-3">
                <Slider
                  defaultValue={rangeValue}
                  max={maxPrice}
                  step={10}
                  onValueCommit={(value) => {
                    setRangeValue([value[0], value[1]]);
                    dispatch(
                      urlReduxActions.addMinandMaxPrice({
                        minPrice: value[0],
                        maxPrice: value[1],
                      })
                    );
                    const priceUrlHandler = new URLSearchParams(
                      location.search
                    );
                    priceUrlHandler.set("minPrice", value[0]);
                    priceUrlHandler.set("maxPrice", value[1]);
                    setSearchParams(priceUrlHandler);
                    refetchProductList();
                  }}
                />
                <div className="flex flex-row justify-between mt-5">
                  <Label htmlFor={0}>0</Label>
                  <Label htmlFor={maxPrice}>{maxPrice}</Label>
                </div>
                <p className="text-center">
                  Price: ₹{rangeValue[0]} - ₹{rangeValue[1]}
                </p>
              </AccordionContent>
            </AccordionItem>
          ) : null}
          {attributes?.map((attribute) => (
              <AccordionItem key={attribute._id} value={attribute.name}>
                <AccordionTrigger>{attribute.name}</AccordionTrigger>
                <AccordionContent className="bg-neutral-100 bg-opacity-20 rounded-lg p-3">
                  {attribute.attribute_options.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center space-x-2 my-2 space-y-1"
                    >
                      <Checkbox
                        id={item._id}
                        onCheckedChange={(checked) => {
                          updateUrlParams(
                            attribute.attribute_code,
                            item.value,
                            checked
                          );
                        }}
                      />
                      <Label
                        htmlFor={item.value}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {item.value}
                      </Label>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default ProductsFilter;

// const hasAttribute_code = true;
// let attribute_code = hasAttribute_code
//   ? attribute.attribute_code
//   : value;
// let params = {};
// params[attribute_code] =
//   urlParamsData[attribute.attribute_code];
