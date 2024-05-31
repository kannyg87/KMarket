import React, { useEffect, useState } from "react";
import Header from "./Header";
// import { Switch, Route } from "react-router-dom";
import { UserProvider } from "../context/user";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <h1>Project Client</h1>
      <UserProvider>
        <Header />
        <Outlet /> {/* This renders the child routes */}

      </UserProvider>
    </>
  );
}

export default App;
