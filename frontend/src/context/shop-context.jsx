import { useQuery } from "@tanstack/react-query";
import { createContext, useEffect } from "react";
import { getShopHome } from "../lib/http";
import { toast } from "sonner";

export const ShopContext = createContext();

function ShopProvider({ children }) {
  const {
    data,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["home"],
    queryFn: getShopHome,
    staleTime: 5000,
  });

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error]);

  return (
    <ShopContext.Provider value={{ data, isPending, isError, error }}>
      {children}
    </ShopContext.Provider>
  );
}

export default ShopProvider;
