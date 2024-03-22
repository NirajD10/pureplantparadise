import React, { useRef, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingBar from "react-top-loading-bar";
import { toast } from "sonner";

import { statusOrderSchema } from "./util";

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

function StatusModal({ children, orderid, refetchQuery }) {
  const [openModal, setOpenModal] = useState(false);
  const loadingRef = useRef(null);
  const form = useForm({
    resolver: zodResolver(statusOrderSchema),
    mode: "onChange",
  });

  const { methods, setValue } = form;

  function onSubmit(data) {
    const token = localStorage.getItem("admin-token");

    if (!token) {
      toast.error("Token Missing. Couldn't process it.");
    }

    fetch(
      `${import.meta.env.VITE_ADMIN_AUTH_API_URL}orders/updatestatus/` +
        orderid,
      {
        method: "PUT",
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
          <FormProvider {...methods} setValue={setValue}>
            {/* {isError && (
            <DestructiveCallout title="Error" message={message} />
          )} */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <DialogHeader>
                  <DialogTitle>Update Order Status</DialogTitle>
                  <DialogDescription className="space-y-4 my-2">
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Orders Status</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Update Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="Pending">
                                    Pending
                                  </SelectItem>
                                  <SelectItem value="Processing">
                                    Processing
                                  </SelectItem>
                                  <SelectItem value="Delivered">
                                    Delivered
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button className="w-full" type="submit">
                      Update
                    </Button>
                  </DialogDescription>
                </DialogHeader>
              </form>
            </Form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default StatusModal;
