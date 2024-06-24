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
  return (
    <>
      <h1>Project Client</h1>
       <Login /> 
        
      <Outlet />
    </>
  );
}

export default App;
