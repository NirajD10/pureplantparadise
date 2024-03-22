import React from "react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function InputRadioGroup({ field, label, defaultValue, optionOne, optionTwo }) {
  return (
    <FormItem className="space-y-3">
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <RadioGroup
          {...field}
          onValueChange={field.onChange}
          defaultValue={field.value}
          className="flex flex-col space-y-1"
        >
          <FormItem className="flex items-center space-x-3 space-y-0">
            <FormControl>
              <RadioGroupItem value={optionOne.value} />
            </FormControl>
            <FormLabel className="font-normal">{optionOne.label}</FormLabel>
          </FormItem>
          <FormItem className="flex items-center space-x-3 space-y-0">
            <FormControl>
              <RadioGroupItem value={optionTwo.value} />
            </FormControl>
            <FormLabel className="font-normal">{optionTwo.label}</FormLabel>
          </FormItem>
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}

export default InputRadioGroup;
