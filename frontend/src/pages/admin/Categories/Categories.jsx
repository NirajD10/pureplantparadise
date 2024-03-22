import React from "react";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/http";
import { getAdminCategories } from "@/lib/admin-http"

import CategoriesList from "@/components/admin/Categories/CategoriesList";

function Categories() {
  const {
    data: categorieslist,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getAdminCategories,
  });

  let content;

  if (isError) {
    content = <p>{error.message}</p>;
  }

  return (
    <div className="sm:h-full sm:flex-1 sm:flex-col space-y-5 sm:space-y-8 sm:p-8 py-5">
      {isError && content}
      {categorieslist && (
        <>
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
            </div>
          </div>
          <CategoriesList categorieslist={categorieslist} />
        </>
      )}
    </div>
  );
}

export default Categories;

export function loader() {
  return queryClient.fetchQuery({
    queryKey: ["categories"],
    queryFn: getAdminCategories,
  });
}
