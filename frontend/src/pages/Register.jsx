import { useEffect, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import LoadingBar from "react-top-loading-bar";

import { registerFormSchema } from "@/components/common/AuthModal/util";

import { register } from "@/features/auth/authSlices";
import DestructiveCallout from "@/components/Callout/DestructiveCallout";

import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/inputfield/PasswordInput";

import { ArrowClockwise } from "@phosphor-icons/react";

let buttonContent;

function Register() {
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

  //Redirect home if already signed account
  useEffect(() => {
    if (Object.keys(user || {}).length > 0) {
      navigate("/");
    }
  }, []);

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
        navigate("/");
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
      <div className="sm:container flex justify-center my-20">
        <div className="space-y-4">
          {isError && <DestructiveCallout title="Error" message={message} />}
          <Card className="sm:w-[550px]">
            <CardHeader className="space-y-1">
              <CardTitle className="text-4xl font-bold">
                Create an account
              </CardTitle>
              <CardDescription>
                Enter your name, email below to create your account
              </CardDescription>
            </CardHeader>
            <FormProvider {...methods} setValue={setValue}>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <CardContent>
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
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Create Account</Button>
                  </CardFooter>
                </form>
              </Form>
            </FormProvider>
          </Card>
          <p className="my-6 text-center">
            <Label htmlFor="register" className="text-base text-center mx-1">
              Already have account?
            </Label>
            <Link
              className="inline text-bgsecondary text-center underline underline-offset-4 cursor-pointer"
              to="/login"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
