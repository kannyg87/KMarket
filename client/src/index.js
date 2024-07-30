import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import UserProfile from "./pages/UserProfile";
import "./index.css";
import App from "./components/App";
import AdminLoginPrompt from "./pages/AdminUsers";
import AdminUsers from "./pages/AdminUsers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "adminlog",
        element: <AdminUsers />,
      },
      {
        path: "admin",
        element: <AdminLoginPrompt />,
      },
    ],
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);