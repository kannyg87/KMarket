import React from "react";
import Header from "./Header";
import { UserProvider, UserContext } from "../context/user";
import { Outlet } from "react-router-dom";
import "../index.css";
import Login from "../pages/Login";

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

function AppContent() {
  const { user } = React.useContext(UserContext); // Access user context value

  return (
    <>
      <h1>Project Client</h1>
      <Header /> {/* Pass the user context value to Header */}
      {!user ? null : <Login />}
      <Outlet /> {/* This renders the child routes */}
    </>
  );
}

export default App;
