import React from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function CustomerNote({notes}) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Customer Notes</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-wrap">{notes}</p>
      </CardContent>
    </Card>
  );
}

export default CustomerNote;
