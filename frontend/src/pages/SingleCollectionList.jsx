import React, { useEffect, useRef, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import LoadingBar from "react-top-loading-bar";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import CategoriesList from "@/components/common/CategoriesList/CategoriesList";
import ProductsFilter from "@/components/common/ProductsFilter/ProductsFilter";
import SingleProductView from "@/components/common/Products/SingleProductView";
import PaginationPage from "@/components/common/Pagination/Pagination";
import { Button } from "@/components/ui/button";

import { getCollection, getCollectionInfowithAttributes } from "@/lib/http";
import { sortbymenulist } from "@/data/menulist";
import { urlReduxActions } from "../features/site/urlSlices";

function SingleCollectionList() {
  const loadingRef = useRef(null);
  const [cursor, setCursor] = useState(5);
  const { collectionname } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [urlsetParams, setUrlsetParams] = useSearchParams();

  const { urlParamsData, sortBy, minlocalPrice, maxlocalPrice } = useSelector(
    (state) => state.urlModify
  );

  const {
    data: collectionwithattributes,
    isPending: isCollectionsPending,
    isError: isCollectionsError,
    error: collectionserror,
  } = useQuery({
    queryKey: ["collections-attribute", collectionname],
    queryFn: ({ signal }) =>
      getCollectionInfowithAttributes({ categoryid: collectionname, signal }),
  });

  // const {
  //   data: collections,
  //   isPending,
  //   isError,
  //   error,
  //   refetch,
  // } = useQuery({
  //   queryKey: [
  //     "collections",
  //     collectionname,
  //     cursor,
  //     {
  //       urlParamsData,
  //     },
  //   ],
  //   queryFn: ({ signal }) =>
  //     getCollection({
  //       collectionname,
  //       cursor,
  //       urlParamsData,
  //       signal,
  //     }),
  //   staleTime: 1000,
  // });

  const {
    data: collections,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["collections", collectionname, { urlParamsData }],
    queryFn: ({ pageParam = 0 }) =>
      getCollection({ collectionname, pageParam }),
    getNextPageParam: (lastPages) => lastPages.nextCursor ?? undefined,
  });
  -useEffect(() => {
    // if (isError && error?.response.status === 404) {
    //   navigate("/error");
    // }
    if (status === "error") {
      toast.error(error.message);
    }

    if (isCollectionsError && collectionserror?.response.status !== 404) {
      toast.error(error.message);
    }
    // if (isError && error?.response.status !== 404) {
    //   toast.error(error.message);
    // }
  }, [status, error, isCollectionsError, collectionserror]);

  useEffect(() => {
    // if (isPending || isCollectionsPending) {
    //   loadingRef.current.continuousStart();
    // }

    if (status === "loading" || isCollectionsPending) {
      loadingRef.current.continuousStart();
    }

    if (collections?.pages || collectionwithattributes) {
      loadingRef.current.complete();
    }
  }, [
    status,
    collections?.pages,
    isCollectionsPending,
    collectionwithattributes,
  ]);

  return (
    <div>
      <LoadingBar color="#003E29" ref={loadingRef} shadow={true} />
      {status === "loading" && (
        <div className="h-[80svh] w-full flex flex-col justify-center items-start">
          <span className="loader"></span>
        </div>
      )}
      <React.Fragment>
        <div className="relative flex flex-col justify-center items-center mb-5 overflow-hidden">
          <React.Fragment key={collectionwithattributes?.categories._id}>
            <img
              src={collectionwithattributes?.categories.category_bannerurl}
              alt={collectionwithattributes?.categories.categoriesid}
              loading="lazy"
              className="object-cover h-[230px] md:h-[380px] w-full"
            />
            <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-bold text-6xl md:text-9xl font text-whiteprimary underline decoration-bgsecondary underline-offset-4">
              {collectionwithattributes?.categories.title}
            </h2>
          </React.Fragment>
        </div>
        {/* TODO: Add category description */}
        <main className="container px-3 md:px-4 xl:px-0 overflow-hidden sm:overflow-auto">
          <CategoriesList loadingNeed={false} />
          <div className={`lg:grid lg:grid-cols-4 gap-3`}>
            {isCollectionsPending !== true ? (
              <aside>
                <ProductsFilter
                  attributes={collectionwithattributes?.attributes}
                  maxPrice={collectionwithattributes?.maxPrice}
                  refetchProductList={refetch}
                />
              </aside>
            ) : null}
            <article className="col-span-3">
              <section>
                {collections?.pages[0].productslist.length !== 0 ? (
                  <div className="flex sm:justify-end justify-center items-center mt-5 sm:mt-0">
                    <Label htmlFor="sortby" className=" font-bold text-xl mr-2">
                      Sort by:
                    </Label>
                    <Select
                      defaultValue={sortBy}
                      onValueChange={(value) => {
                        const sortUrlHandler = new URLSearchParams(
                          location.search
                        );
                        sortUrlHandler.set("sortBy", value);
                        setUrlsetParams(sortUrlHandler);
                        dispatch(urlReduxActions.addSortBy({ sortBy: value }));
                        refetch();
                      }}
                    >
                      <SelectTrigger className="w-[160px] sm:w-[180px]">
                        <SelectValue placeholder="Sort By" />
                      </SelectTrigger>
                      <SelectContent>
                        {sortbymenulist.map((sortmenu) => (
                          <SelectItem key={sortmenu.id} value={sortmenu.id}>
                            {sortmenu.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ) : null}
                {collections?.pages.map((page) => (
                  <React.Fragment key={page.nextCursor}>
                    {collections?.pages[0].productslist.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-cols-3 gap-2 mb-3 mt-5">
                        {page?.productslist.map((product) => (
                          <SingleProductView
                            key={product?._id}
                            product={product}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="h-[40svh] flex justify-center items-center mt-5 sm:mt-0">
                        <h4 className="mb-3 mt-5 text-xl sm:text-3xl">
                          No products founds.
                        </h4>
                      </div>
                    )}
                  </React.Fragment>
                ))}
                {collections?.pages[0].productslist.length > 0 ? (
                  <div className="flex justify-center mt-6 mb-14">
                    <Button
                      variant="outline"
                      className="w-36"
                      onClick={() => fetchNextPage()}
                      disabled={!hasNextPage || isFetchingNextPage}
                    >
                      {isFetchingNextPage
                        ? "Loading more..."
                        : hasNextPage
                        ? "Load More"
                        : "Nothing more to load"}
                    </Button>
                  </div>
                ) : null}

                {/* <React.Fragment> */}
                {/* {collections?.productslist.length !== 0 ? (
                    <div className="flex sm:justify-end justify-center items-center mt-5 sm:mt-0">
                      <Label
                        htmlFor="sortby"
                        className=" font-bold text-xl mr-2"
                      >
                        Sort by:
                      </Label>
                      <Select
                        defaultValue={sortBy}
                        onValueChange={(value) => {
                          const sortUrlHandler = new URLSearchParams(
                            location.search
                          );
                          sortUrlHandler.set("sortBy", value);
                          setUrlsetParams(sortUrlHandler);
                          dispatch(
                            urlReduxActions.addSortBy({ sortBy: value })
                          );
                        }}
                      >
                        <SelectTrigger className="w-[160px] sm:w-[180px]">
                          <SelectValue placeholder="Sort By" />
                        </SelectTrigger>
                        <SelectContent>
                          {sortbymenulist.map((sortmenu) => (
                            <SelectItem key={sortmenu.id} value={sortmenu.id}>
                              {sortmenu.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ) : null} */}
                {/* {collections?.productslist.length !== 0 ? (
                    <div className="flex sm:justify-end justify-center items-center mt-5 sm:mt-0">
                      <Label
                        htmlFor="sortby"
                        className=" font-bold text-xl mr-2"
                      >
                        Sort by:
                      </Label>
                      <Select
                        defaultValue={sortBy}
                        onValueChange={(value) => {
                          const sortUrlHandler = new URLSearchParams(
                            location.search
                          );
                          sortUrlHandler.set("sortBy", value);
                          setUrlsetParams(sortUrlHandler);
                          dispatch(
                            urlReduxActions.addSortBy({ sortBy: value })
                          );
                        }}
                      >
                        <SelectTrigger className="w-[160px] sm:w-[180px]">
                          <SelectValue placeholder="Sort By" />
                        </SelectTrigger>
                        <SelectContent>
                          {sortbymenulist.map((sortmenu) => (
                            <SelectItem key={sortmenu.id} value={sortmenu.id}>
                              {sortmenu.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ) : null} */}
                {/* {!isPending && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 auto-cols-3 gap-2 mb-3 mt-5">
                      {collections?.productslist.map((product) => (
                        <SingleProductView
                          key={product?._id}
                          product={product}
                        />
                      ))}
                    </div>
                  )} */}
                {/* {!status === "loading" && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 auto-cols-3 gap-2 mb-3 mt-5">
                      {collections?.productslist.map((product) => (
                        <SingleProductView
                          key={product?._id}
                          product={product}
                        />
                      ))}
                    </div>
                  )} */}
                {/* {collections?.productslist.length === 0 ? (
                    <h4 className="h-[40svh] mb-12 flex items-center justify-center text-xl sm:text-3xl">
                      No products founds.
                    </h4>
                  ) : (
                    <div className="flex justify-center mt-6 mb-14">
                      <Button
                        variant="outline"
                        className="w-36"
                        onClick={() => setCursor((prev) => prev + 1)}
                      >
                        Load More
                      </Button>
                    </div>
                  )} */}
                {/* </React.Fragment> */}
              </section>
            </article>
          </div>
        </main>
      </React.Fragment>
      {/* )} */}
    </div>
  );
}

export default SingleCollectionList;

// export function loader({ params }) {
//   return queryClient.fetchQuery({
//     queryKey: ["collections", params.collectionname],
//     queryFn: ({ signal }) =>
//       getCollection({ collectionname: params.collectionname, signal }),
//   });
// }
