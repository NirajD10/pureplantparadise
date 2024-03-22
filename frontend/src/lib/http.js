import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

let url = import.meta.env.VITE_BACKEND;

// Search
export function SearchProduct({ signal, search }) {
  const searchResult = axios
    .get(url + `/search?input=${search}`, { signal })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((error) => {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });

  return searchResult;
}

// Shop Home
export function getShopHome() {
  const shop = axios
    .get(url + `/shop`)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((error) => {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });

  return shop;
}

// GET Fetch signed in user to browse single order details
export function fetchSingleUserOrderDetail(id, signal) {
  const token = localStorage.getItem("token");
  const singleuserorderdetails = axios
    .get(url + "/user/orders/" + id, {
      signal: signal,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((error) => {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });

  return singleuserorderdetails;
}

export function getSingleProductDetails({ productname, signal }) {
  const products = axios
    .get(url + `/products/${productname}`, { signal: signal })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((error) => {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });

  return products;
}

// GET Category list
export function getCategoryList() {
  const categoriesList = axios
    .get(url + "/categories")
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((error) => {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });

  return categoriesList;
}

// GET collection info and attribute filter options
export function getCollectionInfowithAttributes({ categoryid, signal }) {
  const api_data = axios
    .get(url + `/collections/${categoryid}`, {
      signal: signal,
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((error) => {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
  return api_data;
}

// GET All details of collection as well as filter
export function getCollection({
  collectionname,
  pageParam,
}) {
  /* */
  let urlString = window.location.href;
  let paramString = urlString.split("?")[1];
  let queryString = new URLSearchParams(paramString);
  /* */
  let full_url = url + `/collections-product/${collectionname}?cursor=${pageParam}`;

  if (queryString) {
    full_url =
      url + `/collections-product/${collectionname}` + "?" + queryString + "&cursor=" + pageParam;
  }

  const collections = axios
    .get(full_url)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((error) => {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
  return collections;
}

// Initialize Razorpay order
export function initializeRazorpay(amount, formdetails, cart_items) {
  const order = axios
    .post(url + "/checkout/razorpay", {
      amount,
      formdetails,
      cart_items,
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((error) => {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
  return order;
}

// POST Order for cod checkout
export function codCheckout(amount, formdetails, cart_items) {
  const neworder = axios
    .post(url + "/checkout/cod", {
      amount,
      formdetails,
      cart_items,
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((error) => {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
  return neworder;
}
