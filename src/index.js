import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Screens/Login";
import NavBar from "./Components/NavBar";
import Home from "./Screens/Home";
import Register from "./Screens/Register";
import { HOME_PATH, LOGIN_PATH, SIGNUP_PATH } from "./Utils/constants";

const router = createBrowserRouter([
  {
    path: HOME_PATH,
    element: (
      <>
        <NavBar /> <Home />
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
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
