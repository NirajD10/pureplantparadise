import React from "react";
import { useWatch } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

function MangeInputQuantity({ control }) {
  const isManageStock = useWatch({
    control,
    name: "managestock",
  });
  return (
    <>
      {isManageStock === "yes" && (
        <>
          <Separator className="my-5" />
          <FormField
            control={control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input placeholder="Qty" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
    </>
  );
}

export default MangeInputQuantity;
