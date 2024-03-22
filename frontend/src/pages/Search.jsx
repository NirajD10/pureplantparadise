import React, { useContext } from "react";
import SingleProductView from "../components/common/Products/SingleProductView";
import { SearchContext } from "../context/search-context";
import DestructiveCallout from "../components/Callout/DestructiveCallout";

function Search() {
  const searchCtx = useContext(SearchContext);

  let content = (
    <p className="text-center bg-bgprimary text-xl">
      Please enter a search product name or sku code.
    </p>
  );

  if (searchCtx.isLoading) {
    content = (
      <div className="flex flex-col justify-center items-center h-[30svh]">
        <svg className="loading" viewBox="0 0 80 80" height="80" width="80">
          <circle
            className="track"
            cx="40"
            cy="40"
            r="17.5"
            pathLength="100"
            strokeWidth="5px"
            fill="none"
          />
          <circle
            className="car"
            cx="40"
            cy="40"
            r="17.5"
            pathLength="100"
            strokeWidth="5px"
            fill="none"
          />
        </svg>
      </div>
    );
  }

  if (searchCtx.isError) {
    content = (
      <div className="flex items-start justify-center h-[30svh]">
        <DestructiveCallout
          title={"An Error occured"}
          message={
            searchCtx.error.info?.message ||
            "Failed to fetch Product based on search."
          }
        />
      </div>
    );
  }

  if (searchCtx.data) {
    content = (
      <div className="my-2 flex flex-wrap justify-center gap-5 ">
        {searchCtx.data.map((product) => (
          <SingleProductView key={product._id} product={product} />
        ))}
        {searchCtx.data.length == 0 ? (
          <p className="text-center text-xl h-[30svh]">No product found.</p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="container my-12 flex  flex-col justify-center">
      <h2 className="font-bold text-4xl text-slate-400/50 my-5 px-5 lg:px-0">
        Search for "{searchCtx.searchTerm}"
      </h2>
      {content}
    </div>
  );
}

export default Search;
