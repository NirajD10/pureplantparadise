import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import LoadingBar from "react-top-loading-bar";
import { paymentCheckoutFormSchema } from "@/components/common/Checkout/Form/util.js";

import { initializeRazorpay } from "@/lib/http.js";
import { loadScript } from "@/util/loadScript.js";

import TestPaymentDetailsCard from "@/components/common/Checkout/TestPaymentDetailsCard.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

import razorpaylogo from "@/assets/Razorpay_logo.png";
import stripelogo from "@/assets/stripe.svg";

import { CreditCard, Money } from "@phosphor-icons/react";
import { codCheckout } from "../../../../lib/http";


// eslint-disable-next-line react/prop-types
function PaymentSelect({ setStage, cart_items }) {
  const [paymentmode, setPaymentmode] = useState(null);
  const [gatewayselection, setGatewayselection] = useState(null);
  const loadingRef = useRef(null);

  const {
    totalamount,
    contactFormDetails,
    shippingAddressFormDetails,
    billingAddressFormDetails,
  } = useSelector((state) => state.checkout);

  const form = useForm({
    resolver: zodResolver(paymentCheckoutFormSchema),
    mode: "onChange",
  });

  const { methods, watch, setValue, clearErrors, setError } = form;

  const paymentType = watch("paymenttype");
  const gatewayType = watch("gateway");

  useEffect(() => {
    if (paymentType === "cod") {
      setValue("gateway", undefined);
      clearErrors("gateway");
    }

    if (paymentType === "card" && gatewayType === undefined) {
      setValue("gateway", "");
      setError("gateway", {
        type: "random",
        message: "Please choose any one payment gateway",
      });
    }
  }, [paymentType, gatewayType, setValue, clearErrors]);

  async function onSubmit(data) {
    loadingRef.current.continuousStart();
    setStage(3);
    if (paymentType === "card" && gatewayType === "razorpay") {
      const resRazorpay = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!resRazorpay) {
        toast.error("Couldn't Open Razorpay gateway. Please try again later");
        loadingRef.current.complete();
        return;
      }
      const rpy = await initializeRazorpay(
        totalamount,
        {
          contact: contactFormDetails,
          shippingaddress: shippingAddressFormDetails,
          billingaddress: billingAddressFormDetails,
          paymentType,
          gatewayType,
        },
        cart_items
      );

      if (rpy) {
        const options = {
          key: rpy.key,
          amount: rpy.details.amount,
          currency: "INR",
          name: "PurePlantParadise",
          description: "Indoor Plant Online Shop",
          image:
            "https://res.cloudinary.com/dkophi0vk/image/upload/v1706955947/qfz9pjlgfquotj8tivre.png",
          order_id: rpy.details.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          callback_url: `${import.meta.env.VITE_BACKEND}/paymentverify`,
          theme: {
            color: "#003E29",
          },
        };

        const razorPayPopup = new window.Razorpay(options);
        razorPayPopup.open();
        loadingRef.current.complete();
      }
    } else if (paymentType === "cod") {
      console.log("COD AMOUNT ->", totalamount);

      const coddata = await codCheckout(
        totalamount,
        {
          contact: contactFormDetails,
          shippingaddress: shippingAddressFormDetails,
          billingaddress: billingAddressFormDetails,
          paymentType,
          gatewayType,
        },
        cart_items
      );
      window.location.replace(coddata?.redirectUrl);
    }
  }

  return (
    <React.Fragment>
      <LoadingBar color="#003E29" ref={loadingRef} shadow={true} />
      <div className="space-y-5">
        <button onClick={() => setStage(2)}>Back</button>
        <FormProvider {...methods} setValue={setValue}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>
                    Add a new payment method to your order.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  {/* eslint-disable-next-line react/prop-types */}
                  <FormField
                    control={form.control}
                    name="paymenttype"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            className="grid grid-cols-3 gap-4"
                            onValueChange={(value) => {
                              setPaymentmode(value);
                              field.onChange(value);
                            }}
                            defaultValue={field.value}
                            {...field}
                          >
                            <FormItem>
                              <FormControl>
                                <RadioGroupItem
                                  value="card"
                                  id="card"
                                  className="peer sr-only"
                                />
                              </FormControl>
                              <FormLabel
                                htmlFor="card"
                                className="flex flex-col items-center justify-between gap-2 rounded-md border-2 border-muted bg-popover p-4  peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                              >
                                <CreditCard size={36} color="#121212" />
                                Card
                              </FormLabel>
                            </FormItem>
                            <FormItem>
                              <FormControl>
                                <RadioGroupItem
                                  value="cod"
                                  id="cod"
                                  className="peer sr-only"
                                />
                              </FormControl>
                              <FormLabel
                                htmlFor="cod"
                                className="flex flex-col items-center justify-between gap-2 rounded-md border-2 border-muted bg-popover p-4 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                              >
                                <Money size={36} color="#121212" />
                                Cash on Delivery
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              {paymentmode === "card" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Choose Gateway</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-6">
                    {/* eslint-disable-next-line react/prop-types */}
                    <FormField
                      control={form.control}
                      name="gateway"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              className="flex flex-row gap-3"
                              onValueChange={(value) => {
                                setGatewayselection(value);
                                field.onChange(value);
                              }}
                              defaultValue={field.value}
                              {...field}
                            >
                              <FormItem>
                                <FormControl>
                                  <RadioGroupItem
                                    value="razorpay"
                                    id="razorpay"
                                    className="peer sr-only"
                                  />
                                </FormControl>
                                <FormLabel
                                  htmlFor="razorpay"
                                  className="flex flex-col items-center justify-between gap-2 rounded-md border-2 border-muted bg-popover p-4  peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                >
                                  <img
                                    src={razorpaylogo}
                                    alt="Razorpay Payment Gateway"
                                    className="h-10 w-48 bg-cover"
                                  />
                                  RazorPay
                                </FormLabel>
                              </FormItem>
                              <FormItem>
                                <FormControl>
                                  <RadioGroupItem
                                    value="stripe"
                                    id="stripe"
                                    className="peer sr-only"
                                    disabled={true}
                                  />
                                </FormControl>
                                <FormLabel
                                  htmlFor="stripe"
                                  className="flex flex-col items-center justify-between gap-2 rounded-md border-2 border-muted bg-popover p-4 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                >
                                  <img
                                    src={stripelogo}
                                    alt="Stripe Payment Gateway"
                                    className="h-10 w-48 bg-cover"
                                  />
                                  Stripe (Coming soon)
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <TestPaymentDetailsCard />
                  </CardContent>
                </Card>
              )}

              <div className="float-right">
                <Button variant="outline" type="submit" disabled={!paymentmode}>
                  Place Order
                </Button>
              </div>
            </form>
          </Form>
        </FormProvider>
      </div>
    </React.Fragment>
  );
}

export default PaymentSelect;
