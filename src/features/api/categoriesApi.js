import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../Config/firebase";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      queryFn: async () => {
        try {
          const data = await getDocs(collection(db, "Categories"));
          const categories = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          return { data: categories };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
