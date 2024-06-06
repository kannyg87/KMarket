import React, { createContext, useEffect, useState } from "react";

// Creating context object
const UserContext = createContext();

// Context provider component
function UserProvider({ children }) {
  const [user, setUser] = useState({ name: "", email: "", password: "" }); // Initialized with default properties


  const logout = () => {
    setUser(null)
  }

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/login`)
      .then((r) => r.json())
      .then((data) => {
        console.log('Fetched user:', data);
        setUser(data);
      })
      .catch((error) => console.error('Error fetching user:', error));
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
