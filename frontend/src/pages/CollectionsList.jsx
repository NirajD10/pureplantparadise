import React from "react";
// import { categorieslists } from "../data/datalist";
import { getCategoryList, queryClient } from "../lib/http";
import { useQuery } from "@tanstack/react-query";
import DestructiveCallout from "../components/Callout/DestructiveCallout";
import { Link } from "react-router-dom";

let content;

function CategoriesList() {
  const {
    data: categorieslists,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["shop-categories"],
    queryFn: getCategoryList,
  });

  if (isLoading) {
    content = <span className="loader my-8"></span>;
  }

  if (categorieslists) {
    content = (
      <div className="grid grid-cols-4 gap-3 overflow-hidden">
        {categorieslists.map((categories) => (
          <div
            key={categories.id}
            className="group flex flex-col gap-2 overflow-hidden cursor-pointer"
          >
            <Link to={`${categories.categoriesid}`} reloadDocument>
              <div>
                <img
                  src={categories.thumbnail_imageurl}
                  alt={categories.title}
                  loading="lazy"
                  height={320}
                  className="object-cover rounded-2xl group-hover:border-[0.5px] group-hover:border-bgprimary transition-all"
                />
              </div>
              <p className="my-4 font-normal text-xl group-hover:text-bgsecondary transition-all">
                {categories.title}
              </p>
            </Link>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="container my-20">
      <h3 className="font-bold text-3xl my-4">Categories</h3>
      {isError && (
        <DestructiveCallout
          title="Something went wrong."
          message={error.message?.info}
        />
      )}
      {content}
    </div>
  );
}

export default CategoriesList;

export function loader() {
  return queryClient.fetchQuery({
    queryKey: ["shop-categories"],
    queryFn: getCategoryList,
  });
}
