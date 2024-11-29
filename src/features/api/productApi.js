import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getDocs, collection, getDoc, doc } from "firebase/firestore";
import { db } from "../../Config/firebase";
import { saveProducts } from "../Actions/productsSlice";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      queryFn: async (_, { dispatch }) => {
        try {
          const data = await getDocs(collection(db, "Products"));
          const products = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          dispatch(saveProducts(products));
          return { data: products };
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
    }),
    getSingleProduct: builder.query({
      queryFn: async (id) => {
        try {
          const docRef = doc(db, "Products", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const categoryRef = doc(
              db,
              "Categories",
              docSnap.data().categoryId
            );
            const categorySnap = await getDoc(categoryRef);

            const product = {
              ...docSnap.data(),
              category: categorySnap.exists() ? categorySnap.data() : null,
            };

            return { data: product };
          } else {
            return { error: { message: "Product not found" } };
          }
        } catch (error) {
          return { error: { message: error.message } };
        }
      },
    }),
  }),
});

export const { useGetProductsQuery, useGetSingleProductQuery } = productsApi;
