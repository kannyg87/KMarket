import React, { useContext } from "react";
import { UserProvider, UserContext } from "../context/user";
import { Outlet } from "react-router-dom";
import "../index.css";
import Login from "./login";

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

function AppContent() {
  const { user, admin } = useContext(UserContext);
  if (!user || !admin) {
    return <Login />
  }
  console.log("admin logged", admin)
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
