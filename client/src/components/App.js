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
  const { user } = useContext(UserContext);
  if (!user) {
    return <Login />
  }
  console.log("user",user)

  return (
    <>
      <h1>Project Client</h1>
      <Outlet />
    </>
  );
}

export default App;
