import React from "react";
import { useFormContext } from "react-hook-form";

function ConnectForm({ children }) {
  const {methods, setValue} = useFormContext();

  return children({ ...methods, setValue });
}

export default ConnectForm;
