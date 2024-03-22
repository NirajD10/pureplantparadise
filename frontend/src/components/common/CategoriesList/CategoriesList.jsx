import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategoryList } from "../../../lib/http";

import DestructiveCallout from "../../Callout/DestructiveCallout";
import CategoriesCard from "@/components/common/CategoriesList/CategoriesCard";
import { Link } from "react-router-dom";

let content;

function CategoriesList(props) {
  const {
    data: categorieslists,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["shop-categories"],
    queryFn: getCategoryList,
    staleTime: 5000,
  });

  if (isLoading && props.loadingNeed) {
    content = <span className="w-full flex justify-center loader my-8"></span>;
  }

  if (categorieslists) {
    content = (
      <>
        {categorieslists.map((categories) => (
          <Link key={categories.categoriesid} to={`/collections/${categories.categoriesid}`} reloadDocument>
            <CategoriesCard
              key={categories.categoriesid}
              image={categories.thumbnail_imageurl}
              name={categories.title}
            />
          </Link>
        ))}
      </>
    );
  }

  return (
    <>
      {isError && (
        <div className="container">
          <DestructiveCallout
            title="Something went wrong."
            message={error.message?.info}
          />
        </div>
      )}
      <div className="flex flex-row max-w-full whitespace-nowrap  md:flex md:flex-row md:overflow-auto lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-hidden gap-5 my-20 overflow-auto touch-auto scroll-smooth">
        {content}
      </div>
    </>
  );
}

export default CategoriesList;
