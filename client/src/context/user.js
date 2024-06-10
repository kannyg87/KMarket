import React, { createContext, useEffect, useState } from "react";

// Creating context object
const UserContext = createContext();

// Context provider component
function UserProvider({ children }) {
  const [user, setUser] = useState(null); // Initialized with default properties

  const fetchUserData = () => {
    fetch(`http://127.0.0.1:5555/login`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched user:', data);
        setUser(data);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
