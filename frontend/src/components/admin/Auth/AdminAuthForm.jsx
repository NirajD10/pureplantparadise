import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginFormSchema } from "../../common/AuthModal/util";

import { adminLogin } from "@/features/auth/adminauthSlices";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import DestructiveCallout from "../../Callout/DestructiveCallout";

import { ArrowClockwise } from "@phosphor-icons/react";
import { PasswordInput } from "../../inputfield/PasswordInput";
import { toast } from "sonner";

let buttonContent;

function AdminAuthForm() {
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { methods, setValue } = form;

  const { adminData, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.adminAuth
  );

  useEffect(() => {
    if (adminData?.isAdmin && isSuccess) {
      navigate("/admin/dashboard");
    }
  }, [
    adminData,
    isSuccess,
    message,
    isLoading,
    navigate,
    adminLogin,
    dispatch,
  ]);

  async function onSubmit(data) {
    try {
      const promiseResult = await dispatch(
        adminLogin({ email: data.email, password: data.password })
      ).unwrap();

      if (promiseResult) {
        toast.success("Successful Signed in!");
      }
    } catch (error) {
      
    }
  }

  if (isLoading) {
    buttonContent = (
      <Button className="w-full" disabled>
        <ArrowClockwise
          size={32}
          color="#003E29"
          className="mr-2 animate-spin"
        />
        Signing in
      </Button>
    );
  } else {
    buttonContent = (
      <Button className="w-full" type="submit">
        Sign in
      </Button>
    );
  }

  return (
    <FormProvider {...methods} setValue={setValue}>
      {isError && <DestructiveCallout title="Error" message={message} />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="m@example.com"
                        {...field}
                        value={field.value || ""}
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        id="password"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {buttonContent}
        </form>
      </Form>
    </FormProvider>
  );
}

export default AdminAuthForm;
