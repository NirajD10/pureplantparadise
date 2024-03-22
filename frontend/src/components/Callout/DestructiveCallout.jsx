import React from "react";
import { Warning } from "@phosphor-icons/react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function DestructiveCallout({title, message}) {
  return (
    <Alert variant="destructive">
      <Warning size={16} className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert>
  );
}

export default DestructiveCallout;
