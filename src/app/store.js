import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import loginSliceReducer from "../features/Actions/login";
import { productsApi } from "../features/api/productApi";
import { authApi } from "../features/api/auth";
import productsReducer from "../features/Actions/productsSlice";
import { categoriesApi } from "../features/api/categoriesApi";

const loginPersistConfig = {
  key: "login",
  storage,
};

const persistedLoginReducer = persistReducer(loginPersistConfig, loginSliceReducer);

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    login: persistedLoginReducer,
    products: productsReducer, // Correctly reference 'products' as the key
    [categoriesApi.reducerPath]: categoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      productsApi.middleware,
      categoriesApi.middleware,
      authApi.middleware
    ),
});

export const persistor = persistStore(store);
