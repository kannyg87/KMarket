import React from "react";
import {createRoot} from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from '../src/pages/ErrorPage'
import UserProfile from '../src/pages/UserProfile'
import "./index.css";
import App from "./components/App";
import AdminUsers from "./pages/AdminUsers";


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
        path: "profile/",
        element: <UserProfile />,
      },
      {
        path: "admin/",
        element: <AdminUsers />,
      },
    ],
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);