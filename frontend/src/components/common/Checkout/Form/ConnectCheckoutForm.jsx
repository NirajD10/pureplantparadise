import React from "react";
import { useFormContext } from "react-hook-form";

function ConnectCheckoutForm({children}) {
  const { methods, setValue } = useFormContext();

  return children({ ...methods, setValue });
}

export default ConnectCheckoutForm;
