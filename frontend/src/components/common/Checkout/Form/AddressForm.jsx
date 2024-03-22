import React, {useMemo} from "react";
import countryList from "react-select-country-list";

import InputField from "@/components/inputfield/InputField";
import {Textarea} from "@/components/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// eslint-disable-next-line react/prop-types
function AddressForm({addressType, form}) {
  const options = useMemo(() => countryList().getData(), []);

  return (
    <React.Fragment>
      <div className="my-5 space-y-5">
        <InputField form={form} label="Full name" fieldname={addressType.fullname}/>
        <div className="grid w-full gap-1.5">
          <FormField
            control={form.control}
            name={addressType.address}
            render={({field}) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Address"
                    {...field}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <InputField form={form} label="City" fieldname={addressType.city}/>
          <InputField form={form} label="State" fieldname={addressType.state}/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name={addressType.country}
            render={({field}) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    {...field}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select"/>
                    </SelectTrigger>
                    <SelectContent>
                      {options?.map((country) => (
                        <SelectItem key={country.value} value={country.label}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <InputField form={form} label="Pin/Zip Code" fieldname={addressType.pincode}/>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AddressForm;
