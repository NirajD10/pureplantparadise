import React, { useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

/* redux method */
import { updatePostCart, userCart } from "./features/shop/cartSlices";

/* public pages */
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Search from "./pages/Search";
import ErrorPage from "./pages/ErrorPage";
import CategoriesList, {
  loader as categoriesCardLoader,
} from "./pages/CollectionsList";
import SingleCollectionList from "./pages/SingleCollectionList";
import SingleProductDetails, {
  loader as singleProductLoader,
} from "./pages/SingleProductDetails";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import OrderPaymentStatus from "@/pages/OrderPaymentStatus";
import Profile from "./pages/Profile";
import ProfileLayout from "./components/common/Profile/ProfileLayout";
import UserOrders from "./pages/UserOrders";
import UserOrderDetails, {
  loader as userOrderdetailLoader,
} from "./pages/UserOrderDetails";

/* admin pages */
import PrivateRoutes from "./pages/admin/PrivateRoutes";
import AuthPage from "./components/admin/Auth/AuthPage";
import Dashboard, { loader as dashboardLoader } from "./pages/admin/Dashboard";
import AdminErrorPage from "./pages/admin/AdminErrorPage";
import Orders from "./pages/admin/Orders/Orders";
import Customers, {
  loader as customerListLoader,
} from "./pages/admin/Customers/Customers";
import CustomerDetails from "./pages/admin/Customers/CustomerDetails";
import Products from "./pages/admin/Products/Products";
import ProductForm from "./pages/admin/Products/ProductForm";
import Categories, {
  loader as categoriesListLoader,
} from "./pages/admin/Categories/Categories";
import CategoriesForm from "./pages/admin/Categories/CategoriesForm";
import Attributes, {
  loader as attributesListLoader,
} from "./pages/admin/Attributes/Attributes";
import AttributesForm from "./pages/admin/Attributes/AttributesForm";
import OrderDetail, {
  loader as orderdetailLoader,
} from "./pages/admin/Orders/OrderDetail";
import Settings from "./pages/admin/Settings";

import { queryClient } from "./lib/http";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "search", element: <Search /> },
      { path: "error", element: <ErrorPage /> },
      {
        path: "collections",
        element: <CategoriesList />,
        loader: categoriesCardLoader,
      },
      { path: "cart", element: <CartPage /> },
      {
        path: "collections/:collectionname",
        element: <SingleCollectionList />,
      },
      {
        path: "products/:productname",
        element: <SingleProductDetails />,
        loader: singleProductLoader,
      },
      {
        path: "/orderpayment",
        element: <OrderPaymentStatus />,
      },
      {
        path: "profile",
        element: <ProfileLayout />,
        children: [
          { index: true, element: <Profile /> },
          { path: "orders", element: <UserOrders /> },
          {
            path: "orders/:id",
            element: <UserOrderDetails />,
            loader: userOrderdetailLoader,
          },
        ],
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/admin",
    element: <PrivateRoutes />,
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" /> },
      { path: "dashboard", element: <Dashboard />, loader: dashboardLoader },
      {
        path: "orders",
        children: [
          { index: true, element: <Orders /> },
          {
            path: "edit/:id",
            element: <OrderDetail />,
            loader: orderdetailLoader,
          },
        ],
      },
      {
        path: "customer-list",
        children: [
          { index: true, element: <Customers />, loader: customerListLoader },
          { path: ":customerid", element: <CustomerDetails /> },
        ],
        errorElement: <AdminErrorPage />,
      },
      {
        path: "products",
        children: [
          { index: true, element: <Products /> },
          { path: "new", element: <ProductForm /> },
          { path: "edit/:id", element: <ProductForm /> },
        ],
      },
      {
        path: "categories",
        children: [
          {
            index: true,
            element: <Categories />,
            loader: categoriesListLoader,
          },
          { path: "new", element: <CategoriesForm /> },
          { path: "edit/:id", element: <CategoriesForm /> },
        ],
      },
      {
        path: "attributes",
        children: [
          {
            index: true,
            element: <Attributes />,
            loader: attributesListLoader,
          },
          {
            path: "new",
            element: <AttributesForm />,
            loader: categoriesListLoader, //to load and select attribute group
          },
          {
            path: "edit/:id",
            element: <AttributesForm />,
          },
        ],
      },
      {
        path: "settings",
        element: <Settings />,
      },
      { path: "*", element: <AdminErrorPage /> },
    ],
  },
  {
    path: "/admin/login",
    element: <AuthPage />,
  },
]);

let isInitial = true;

function App() {
  const dispatch = useDispatch();

  const isSignedIn = useSelector((state) => state.auth.isSuccess);
  const account = useSelector((state) => state.auth.user);

  const cart = useSelector((state) => state.cart.items);
  const changedCart = useSelector((state) => state.cart.isChanged);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (isSignedIn && account) {
      dispatch(userCart(account.id));
    }
  }, [dispatch, isSignedIn, account]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (changedCart && isSignedIn && account) {
      const cartdata = cart.map((item) => {
        return { productid: item._id, quantity: item.quantity };
      });
      dispatch(
        updatePostCart({ cartdata: { items: cartdata }, id: account.id })
      );
    }
  }, [dispatch, changedCart, isSignedIn, account]);

  return (
    <React.Fragment>
      <Toaster expand={true} richColors closeButton />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </React.Fragment>
  );
}

export default App;
