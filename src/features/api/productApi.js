import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getDocs, collection, getDoc, doc } from "firebase/firestore";
import { db } from "../../Config/firebase";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }), // Adjust your base URL if needed
  endpoints: (builder) => ({
    getProducts: builder.query({
      queryFn: async () => {
        try {
          const data = await getDocs(collection(db, "Products"));
          console.log("data", data);
          const products = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          return { data: products };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
    }),
    getSingleProduct: builder.query({
      queryFn: async (id) => {
        try {
          console.log("id", id);
          const docRef = doc(db, "Products", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
          } else {
            console.log("No such document!");
          }
          return { data: docSnap.data() };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
    }),
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === "persist/REHYDRATE") {
      return action.payload?.[reducerPath];
    }
  },
});

// Make sure to export the `api` object
export const { useGetProductsQuery, useGetSingleProductQuery } = productsApi;
