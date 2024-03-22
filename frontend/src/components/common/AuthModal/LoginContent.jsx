import { useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import LoadingBar from "react-top-loading-bar";

import { loginFormSchema } from "./util";

import { login } from "@/features/auth/authSlices";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { checkoutReduxActions } from "@/features/shop/checkoutSlices.js";
import { PasswordInput } from "../../inputfield/PasswordInput";

let buttonContent;

function LoginContent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loadingRef = useRef(null);

  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
  });

  const auth = useSelector((state) => state.auth);

  const { methods, setValue } = form;

  async function onSubmit(data, e) {
    loadingRef.current.continuousStart();
    e.preventDefault();
    try {
      const originalPromiseResult = await dispatch(
        login({ email: data.email, password: data.password })
      ).unwrap();
      if (originalPromiseResult) {
        toast.success("Successfully Login.");
        dispatch(checkoutReduxActions.reset());
        dispatch(
          checkoutReduxActions.contactFormProcess({ email: auth.user.email })
        );
        loadingRef.current.complete();
      }
    } catch (rejectedValueOrSerializedError) {
      loadingRef.current.complete();
    }
  }

  if (auth.isLoading) {
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
    <>
      <LoadingBar color="#003E29" ref={loadingRef} shadow={true} />
      <DialogHeader className="space-y-1">
        <DialogTitle className="text-4xl font-bold">Login in</DialogTitle>
        <DialogDescription>
          Enter your email and password below to sign in
        </DialogDescription>
      </DialogHeader>
      {auth.isError && (
        <DestructiveCallout title="Error" message={auth.message} />
      )}
      <FormProvider {...methods} setValue={setValue}>
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
                        ></PasswordInput>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>{buttonContent}</DialogFooter>
          </form>
        </Form>
      </FormProvider>
    </>
  );
}

export default LoginContent;
