import { useQuery } from "@tanstack/react-query";
import { createContext, useState } from "react";
import { SearchProduct } from "../lib/http";

export const SearchContext = createContext();

function SearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["search", { search: searchTerm }],
    queryFn: ({ signal, queryKey }) =>
      SearchProduct({ signal, ...queryKey[1] }),
    enabled: searchTerm !== undefined,
  });

  return (
    <SearchContext.Provider
      value={{ data, isLoading, isError, error, searchTerm, setSearchTerm }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;
