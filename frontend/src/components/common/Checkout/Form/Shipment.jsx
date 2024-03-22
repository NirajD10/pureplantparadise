import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useForm, FormProvider} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {addressCheckoutFormSchema} from "@/components/common/Checkout/Form/util.js";
import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import InputField from "@/components/inputfield/InputField.jsx";

import {User} from "@phosphor-icons/react";
import AddressForm from "./AddressForm";
import {checkoutReduxActions} from "@/features/shop/checkoutSlices.js";

const shippinhaddressFormfield = {
  fullname: "shippingfullname",
  address: "shippingaddress",
  city: "shippingaddresscity",
  state: "shippingaddressstate",
  country: "shippingaddresscountry",
  pincode: "shippingaddresspincode",
};

const billingaddressFormfield = {
  fullname: "billingfullname",
  address: "billingaddress",
  city: "billingaddresscity",
  state: "billingaddressstate",
  country: "billingaddresscountry",
  pincode: "billingaddresspincode",
};

// eslint-disable-next-line react/prop-types
function Shipment({setStage}) {
  const [isBillingAddressNeeded, setIsBillingAddressNeeded] = useState(false);
  const form = useForm({
    resolver: zodResolver(addressCheckoutFormSchema),
    mode: "onChange",
  });
  const {methods, setValue, watch} = form;

  const {
    shippingfullname,
    shippingaddress,
    shippingaddresscity,
    shippingaddressstate,
    shippingaddresscountry,
    shippingaddresspincode
  } = watch();

  const dispatch = useDispatch();
  const {email} = useSelector((state) => state.checkout.contactFormDetails);

  useEffect(() => {
    if (isBillingAddressNeeded) {
      setValue("billingfullname", shippingfullname);
      setValue("billingaddress", shippingaddress);
      setValue("billingaddresscity", shippingaddresscity);
      setValue("billingaddressstate", shippingaddressstate);
      setValue("billingaddresscountry", shippingaddresscountry);
      setValue("billingaddresspincode", shippingaddresspincode);
    }
  }, [billingaddressFormfield, setValue, shippingfullname, shippingaddress, shippingaddresscity, shippingaddressstate, shippingaddresscountry, shippingaddresspincode]);


  function onSubmit(data) {
    // alert(JSON.stringify(data, null, 2));
    dispatch(checkoutReduxActions.addressFormProcess({data: data}));
    setStage(3);
  }

  return (
    <div className="mb-5">
      <div className="my-5 space-y-5">
        <div>
          <div className=" flex items-center space-x-4 rounded-md border p-4">
            <User size={28} color="#121212"/>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">{email}</p>
              {/*<p className="text-sm text-muted-foreground">(+91) 1234567890</p>*/}
            </div>
          </div>
        </div>
      </div>
      <FormProvider {...methods} setValue={setValue}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <InputField form={form} label="Phone" fieldname="phoneno"/>
            <div>
              <h3 className="text-[#121212] my-2 text-xl">Shipping Address</h3>
              <AddressForm addressType={shippinhaddressFormfield} form={form}/>
            </div>
            <div>
              <h3 className="text-[#121212] my-2 text-xl">Billing Address</h3>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="conditionsbillingaddress"
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setValue("billingfullname", shippingfullname);
                      setValue("billingaddress", shippingaddress);
                      setValue("billingaddresscity", shippingaddresscity);
                      setValue("billingaddressstate", shippingaddressstate);
                      setValue("billingaddresscountry", shippingaddresscountry);
                      setValue("billingaddresspincode", shippingaddresspincode);
                    } else {
                      setValue("billingfullname", "");
                      setValue("billingaddress", "");
                      setValue("billingaddresscity", "");
                      setValue("billingaddressstate", "");
                      setValue("billingaddresscountry", "");
                      setValue("billingaddresspincode", "");
                    }
                    setIsBillingAddressNeeded(prevState => !prevState);
                  }
                  }
                />
                <label
                  htmlFor="conditionsbillingaddress"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  My billing address is same as shipping address
                </label>
              </div>
              {!isBillingAddressNeeded && (
                <AddressForm addressType={billingaddressFormfield} form={form}/>
              )}
            </div>

            <div className="float-right">
              <Button variant="outline" type="submit">
                Continue to Payment
              </Button>
            </div>
          </form>
        </Form>
      </FormProvider>
    </div>
  );
}

export default Shipment;
