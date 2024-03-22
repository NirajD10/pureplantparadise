import React, { useEffect } from "react";

import { SpinnerGap, Trash } from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import { postDeleteAdminAction } from "@/lib/admin-http";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

function DeleteAttributeAction({ id }) {
  const navigate = useNavigate();
  const { data, mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: postDeleteAdminAction,
    onSuccess: async (data) => {
      // toast.success(data)
      navigate("/admin/attributes");
    },
  });

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }

    if (isSuccess) {
      toast.success("Successfully deletion");
    }
  }, [isError, error, isSuccess, data]);
  return (
    <div className="flex items-center justify-center">
      {isPending ? (
        <Button disabled>
          <SpinnerGap size={24} color="#003e29" className="animate-spin" />
        </Button>
      ) : (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="icon">
              <Trash size={24} color="#fff" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will delete attributes from
                our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => mutate({ id })}
                variant="secondary"
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}

export default DeleteAttributeAction;
