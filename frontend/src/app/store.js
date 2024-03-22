import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "../features/auth/authSlices";
import adminAuthReducer from "../features/auth/adminauthSlices";
import cartReducer from "../features/shop/cartSlices";
import urlReducer from "../features/site/urlSlices";
import checkoutReducer from "../features/shop/checkoutSlices.js";

const reducers = combineReducers({
  auth: authReducer,
  adminAuth: adminAuthReducer,
  cart: cartReducer,
  urlModify: urlReducer,
  checkout: checkoutReducer,
});

export const store = configureStore({
  reducer: persistReducer(
    { key: "root", storage, blacklist: ["urlModify"] },
    reducers
  ),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: import.meta.env.VITE_PRODUCTION_MODE,
});
