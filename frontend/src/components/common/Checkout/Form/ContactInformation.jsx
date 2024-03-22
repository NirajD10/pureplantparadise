import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { contactCheckoutFormSchema } from "@/components/common/Checkout/Form/util.js";

import AuthModal from "../../AuthModal/AuthModal";
import { Form } from "@/components/ui/form";
import InputField from "@/components/inputfield/InputField";
import { Button } from "@/components/ui/button";
import { checkoutReduxActions } from "@/features/shop/checkoutSlices.js";

// eslint-disable-next-line react/prop-types
function ContactInformation({ setStage }) {
  const form = useForm({
    resolver: zodResolver(contactCheckoutFormSchema),
    mode: "onChange",
  });
  const dispatch = useDispatch();
  const { methods, setValue } = form;

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setValue("email", user?.email);
    } else {
      setValue("email", "");
    }
  }, []);

  function onSubmit(data) {
    // alert(JSON.stringify(data, null, 2));
    dispatch(checkoutReduxActions.contactFormProcess({ email: data.email }));
    setStage(2);
  }

  return (
    <div>
      <h3 className="text-[#121212] my-2 text-xl">Contact Information</h3>
      <div>
        {!user && (
          <p className="text-muted-foreground text-base">
            Already have account?
            <span className="text-bgprimary">
              {" "}
              <AuthModal>
                <p className="underline underline-offset-2">Login</p>
              </AuthModal>{" "}
            </span>
          </p>
        )}

        <FormProvider {...methods} setValue={setValue}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="my-5 space-y-5"
            >
              <div>
                <InputField
                  form={form}
                  label="Email"
                  fieldname="email"
                  disabled={user ? true : false}
                />
              </div>

              <div className="float-right">
                <Button variant="outline" type="submit">
                  Continue to Shipping
                </Button>
              </div>
            </form>
          </Form>
        </FormProvider>
      </div>
    </div>
  );
}

export default ContactInformation;
