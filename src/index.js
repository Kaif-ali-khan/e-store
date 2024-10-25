import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Screens/Login";
import Home from "./Screens/Home";
import Register from "./Screens/Register";
import { Provider } from "react-redux";
import { store, persistor } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";

import {
  HOME_PATH,
  LOGIN_PATH,
  SIGNUP_PATH,
  PRODUCTDETAILS_PATH,
  PRODUCT_FORM,
  PRODUCT_TABLE,
  ADDPRODUCT_FORM,
  CATEGORIES_TABLE,
  ADDCATEGORIES_FORM,
  CATEGORIES_FORM,
} from "./Utils/constants";
import ProductDetails from "./Screens/ProductDetails";
import AddProductForm from "./Screens/AddProductForm";
import ProductTable from "./Screens/ProductTable";
import CategoriesForm from "./Screens/CategoriesForm";
import CategoryTable from "./Screens/CategoryTable";
import Wrapper from "./Components/Wrapper";

const router = createBrowserRouter([
  {
    path: HOME_PATH,
    element: (
      <>
        <Wrapper>
          <Home />
        </Wrapper>
      </>
    ),
  },
  {
    path: LOGIN_PATH,
    element: (
      <>
        <LoginPage />
      </>
    ),
  },
  {
    path: SIGNUP_PATH,
    element: (
      <>
        <Register />
      </>
    ),
  },
  {
    path: PRODUCTDETAILS_PATH(), // "/productdetails/:id"
    element: (
      <>
        <Wrapper>
          <ProductDetails />
        </Wrapper>
      </>
    ),
  },
  {
    path: PRODUCT_FORM(),
    element: (
      <>
        <Wrapper>
          <AddProductForm />
        </Wrapper>
      </>
    ),
  },

  {
    path: ADDPRODUCT_FORM,
    element: (
      <>
        <Wrapper>
          <AddProductForm />
        </Wrapper>
      </>
    ),
  },

  {
    path: PRODUCT_TABLE,
    element: (
      <>
        <Wrapper>
          <ProductTable />
        </Wrapper>
      </>
    ),
  },
  {
    path: CATEGORIES_FORM(),
    element: (
      <>
        <Wrapper>
          <CategoriesForm />
        </Wrapper>
      </>
    ),
  },

  {
    path: ADDCATEGORIES_FORM,
    element: (
      <>
        <Wrapper>
          <CategoriesForm />
        </Wrapper>
      </>
    ),
  },
  {
    path: CATEGORIES_TABLE,
    element: (
      <>
        <Wrapper>
          <CategoryTable />
        </Wrapper>
      </>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
