import React from "react";
import Header from "./Header";
import { UserProvider } from "../context/user";
import { Outlet } from "react-router-dom";
import "../index.css";

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

function AppContent() {
  return (
    <>
      <h1>Project Client</h1>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
