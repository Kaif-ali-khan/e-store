import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { saveUser } from "../login";
import { auth, db, storage } from "../../Config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/auth" }),
  endpoints: (builder) => ({
    login: builder.mutation({
      queryFn: async ({ userEmail, password }, { dispatch }) => {
        try {
          const firebaseLogin = await signInWithEmailAndPassword(
            auth,
            userEmail,
            password
          );

          const docRef = doc(db, "Users", firebaseLogin?.user?.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const obj = {
              ...docSnap?.data(),
              id: firebaseLogin?.user?.uid,
            };

            dispatch(saveUser(obj));
            console.log("obj", obj);
          } else {
            console.log("No such document!");
          }

          return { data: "Login successful" };
        } catch (error) {
          console.error("Login failed:", error);
          return { error: { message: error.message } };
        }
      },
    }),
    register: builder.mutation({
      queryFn: async ({
        userEmail,
        userPassword,
        userName,
        userPhone,
        uploadImage,
      }) => {
        try {
          await createUserWithEmailAndPassword(auth, userEmail, userPassword);

          const user = auth.currentUser;

          let imageUrl = "";

          // Upload image if one is selected
          if (uploadImage) {
            const imageRef = ref(storage, `user-images/${uploadImage.name}`);
            await uploadBytes(imageRef, uploadImage); // Upload the file
            imageUrl = await getDownloadURL(imageRef); // Get the file URL
            console.log("imageUrl", imageUrl);
          }
          if (user) {
            await setDoc(doc(db, "Users", user.uid), {
              name: userName,
              phone: userPhone,
              email: userEmail,
              password: userPassword,
              imageUrl: imageUrl,
            });
          }

          return { data: "Register successful" };
        } catch (error) {
          console.error("Register failed:", error);

          // Additional handling for network errors
          if (error.message.includes("network-request-failed")) {
            return { error: { message: "Network error, please try again." } };
          }
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

export const { useLoginMutation, useRegisterMutation } = authApi;
