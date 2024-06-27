// context/user.js

import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user session on initial load
    const fetchUser = async () => {
      try {
        const response = await fetch('/authorized');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          setUser(null); // Not authorized or session expired
        }
      } catch (error) {
        console.error("Failed to fetch user session:", error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };