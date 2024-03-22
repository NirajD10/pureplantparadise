import { useEffect, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import LoadingBar from "react-top-loading-bar";

import { loginFormSchema } from "@/components/common/AuthModal/util";

import { login } from "@/features/auth/authSlices";

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
import DestructiveCallout from "@/components/Callout/DestructiveCallout";

import { ArrowClockwise } from "@phosphor-icons/react";
import { checkoutReduxActions } from "@/features/shop/checkoutSlices.js";
import { PasswordInput } from "@/components/inputfield/PasswordInput";

let buttonContent;

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loadingRef = useRef(null);

  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
  });

  const auth = useSelector((state) => state.auth);

  //Redirect home if already signed account
  useEffect(() => {
    if (Object.keys(auth.user || {}).length > 0) {
      navigate("/");
    }
  }, []);

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
        setTimeout(() => {
          navigate("/");
        }, 100);
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
      <div className="sm:container flex justify-center my-20">
        <div className="space-y-4">
          {auth.isError && (
            <DestructiveCallout title="Error" message={auth.message} />
          )}
          <Card className="sm:w-[550px]">
            <CardHeader className="space-y-1">
              <CardTitle className="text-4xl font-bold">Login in</CardTitle>
              <CardDescription>
                Enter your email and password below to sign in
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
                  </CardContent>
                  <CardFooter>{buttonContent}</CardFooter>
                </form>
              </Form>
            </FormProvider>
          </Card>
          <p className="my-6 text-center">
            <Label htmlFor="register" className="text-base text-center mx-1">
              New here?
            </Label>
            <Link
              className="inline text-bgsecondary text-center underline underline-offset-4 cursor-pointer"
              to="/register"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
