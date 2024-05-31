import React, { createContext, useEffect, useState } from "react";
/*when we create context we need two things:
actual context object and the context provider component  */
// creating context object
const UserContext = createContext();
console.log("context user", UserContext);

// context provider component
function UserProvider({ children }) {
  const [user, setUser] = useState("Kanny");
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
export { UserContext, UserProvider };
