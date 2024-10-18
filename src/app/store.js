import { configureStore } from "@reduxjs/toolkit";
import loginSliceReducer from "../features/login";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { productsApi } from "../features/api/productApi"; // Correctly import `api`
import { authApi } from "../features/api/auth";
const persistConfig = {
  key: "api",
  storage,
};

const loginPersistConfig = {
  key: "login",
  storage,
};

const persistedLoginReducer = persistReducer(
  loginPersistConfig,
  loginSliceReducer
);

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    login: persistedLoginReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      productsApi.middleware,
      authApi.middleware
    ),
});

export const persistor = persistStore(store);
