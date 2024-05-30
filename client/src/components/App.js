import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Switch, Route } from "react-router-dom";
import { UserProvider } from "../context/user";

function App() {
  return (
    <>
      <h1>Project Client</h1>;
      <UserProvider>
        <Header />
      </UserProvider>
    </>
  );
}

export default App;
