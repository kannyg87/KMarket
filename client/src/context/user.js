import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/authorized');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to fetch user session:", error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);
  console.log("objectuser", admin)
  console.log("useruser", user)

  return (
    <UserContext.Provider value={{ user, setUser, admin, setAdmin, isAdmin, setIsAdmin}}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };