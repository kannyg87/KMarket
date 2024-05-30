import React, { createContext } from 'react'
/*when we create context we need two things:
actual context object and the context provider component  */
// creating context object
const UserContext = createContext();
console.log(UserContext)

// context provider component
function UserProvider({ children }) {
  return <UserContext.Provider value={null}>{ children }</UserContext.Provider>
}
export { UserContext, UserProvider }