import { useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
// import toast from "react-hot-toast";
import { toast } from "sonner";
import LoadingBar from "react-top-loading-bar";

import { registerFormSchema } from "./util";

import { register } from "@/features/auth/authSlices";
import DestructiveCallout from "../../Callout/DestructiveCallout";

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
import { PasswordInput } from "../../inputfield/PasswordInput";

import { ArrowClockwise } from "@phosphor-icons/react";

let buttonContent;

function RegisterContent() {
  const loadingRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(registerFormSchema),
    mode: "onChange",
  });

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const { methods, setValue } = form;

  async function onSubmit(data) {
    loadingRef.current.continuousStart();
    try {
      const originalPromiseResult = await dispatch(
        register({
          name: data.name,
          email: data.email,
          password: data.password,
        })
      ).unwrap();
      if (originalPromiseResult) {
        toast.success("Account Registered!");
        loadingRef.current.complete();
      }
    } catch (rejectedValueOrSerializedError) {
      loadingRef.current.complete();
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
        Creating an account
      </Button>
    );
  } else {
    buttonContent = (
      <Button className="w-full" type="submit">
        Create Account
      </Button>
    );
  }

  return (
    <>
      <LoadingBar color="#003E29" ref={loadingRef} shadow={true} />
      <DialogHeader className="space-y-1">
        <DialogTitle className="text-4xl font-bold">
          Create an account
        </DialogTitle>
        <DialogDescription>
          Enter your name, email below to create your account
        </DialogDescription>
      </DialogHeader>
      {isError && <DestructiveCallout title="Error" message={message} />}
      <FormProvider {...methods} setValue={setValue}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Jane/John Doe"
                          {...field}
                          value={field.value || ""}
                          type="text"
                          id="name"
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
            <DialogFooter>
              <Button className="w-full">Create Account</Button>
            </DialogFooter>
          </form>
        </Form>
      </FormProvider>
    </>
  );
}

export default RegisterContent;
