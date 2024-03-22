import React, { useEffect } from "react";
import AttributesList from "@/components/admin/Attributes/AttributesList";
import { queryClient } from "@/lib/http";
import { getAdminAttributes } from "@/lib/admin-http";
import { useQuery } from "@tanstack/react-query";

function Attributes() {
  const {
    data: attributesList,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["attributes"],
    queryFn: getAdminAttributes,
  });

  if (isError) {
    content = <p>{error.message}</p>;
  }

  return (
    <div className="sm:h-full sm:flex-1 sm:flex-col space-y-5 sm:space-y-8 py-5 sm:p-8">
      {isError && content}
      {attributesList && (
        <>
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Attributes</h2>
            </div>
          </div>

          <AttributesList attributesList={attributesList} />
        </>
      )}
    </div>
  );
}

export default Attributes;

export function loader() {
  return queryClient.fetchQuery({
    queryKey: ["attributes"],
    queryFn: getAdminAttributes,
  });
}
