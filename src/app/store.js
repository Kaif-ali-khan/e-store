import { configureStore } from "@reduxjs/toolkit";
import loginSliceReducer from "../features/login";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// Create RTK Query API
const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getPosts: builder.query({ query: () => "posts" }),
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === "persist/REHYDRATE") {
      return action.payload?.[reducerPath];
    }
  },
});

// Persist configuration
const persistConfig = {
  key: "api",
  storage,
};

// Persist configuration for login
const loginPersistConfig = {
  key: "login",
  storage,
};

const persistedReducer = persistReducer(persistConfig, api.reducer);
const persistedLoginReducer = persistReducer(
  loginPersistConfig,
  loginSliceReducer
);

// Configure the store
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer, // Remove persistence from the API reducer
    login: persistedLoginReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
});

export const persistor = persistStore(store);
