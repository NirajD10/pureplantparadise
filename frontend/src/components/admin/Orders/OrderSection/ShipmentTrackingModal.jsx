import React, { useRef, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingBar from "react-top-loading-bar";
import { toast } from "sonner";

import { shipmentTrackingFormSchema } from "./util";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

function ShipmentTrackingModal({ children, orderid }) {
  const [openModal, setOpenModal] = useState(false);
  const loadingRef = useRef(null);
  const form = useForm({
    resolver: zodResolver(shipmentTrackingFormSchema),
    mode: "onChange",
  });

  const { methods, setValue } = form;

  function onSubmit(data) {
    const token = localStorage.getItem("admin-token")

    if(!token) {
      toast.error("Token Missing. Couldn't process it.")
    }

    fetch(
      `${import.meta.env.VITE_ADMIN_AUTH_API_URL}orders/updatecarrier/` +
        orderid,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((resData) => {
        if (resData.status === 500 || resData.status === 404) {
          throw new Error(resData.message);
        } else if (resData.status === 422 || resData.status === 401) {
          throw new Error(resData.message);
        } else if (resData.status === 400) {
          throw new Error(resData.message);
        } else {
          toast.success(resData.message);
          loadingRef.current.complete();
          setOpenModal(false);
          refetchQuery();
        }
      })
      .catch((error) => {
        loadingRef.current.complete();
        setOpenModal(false);
        toast.error(error.message);
      });
  }

  return (
    <React.Fragment>
      <LoadingBar color="#003E29" ref={loadingRef} shadow={true} />
      <Dialog
        open={openModal}
        onOpenChange={() => setOpenModal((prevState) => !prevState)}
      >
        <DialogTrigger asChild={true}>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ship Items</DialogTitle>
            <DialogDescription>
              <FormProvider {...methods} setValue={setValue}>
                {/* {isError && (
                <DestructiveCallout title="Error" message={message} />
              )} */}
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 my-2"
                  >
                    <FormField
                      control={form.control}
                      name="tracking_number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tracking number</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value || ""}
                              type="text"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="carrier"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Carrier</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="DTDC/UPS/FEDEX..."
                              {...field}
                              value={field.value || ""}
                              type="text"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button className="w-full" type="submit">
                      Update
                    </Button>
                  </form>
                </Form>
              </FormProvider>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default ShipmentTrackingModal;
