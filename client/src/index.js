import React from "react";
import {createRoot} from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from '../src/pages/ErrorPage'
import About from '../src/pages/About'
import Login from '../src/pages/Login'
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
        path: "about",
        element: <About />,
      },
      {
        path: "login",
        element: <Login />,
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