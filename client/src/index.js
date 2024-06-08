import React from "react";
import {createRoot} from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from '../src/pages/ErrorPage'
import MainLogin from '../src/pages/MainLogin'
import UserProfile from '../src/pages/UserProfile'
import "./index.css";
import App from "./components/App";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Use App as the main element
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "login",
        element: <MainLogin />,
      },
      {
        path: "profile/",
        element: <UserProfile />,
      },
    ],
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);