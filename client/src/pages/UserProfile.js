// UserProfile.js
import react, { useContext } from "react"
import { UserContext } from "../context/user";

function UserProfile() {
  const {user} =useContext(UserContext)
  return (
    <main>
      <h1>This is user profile component</h1>
      <h1>ues name is: {user}</h1>
    </main>
  );
}

export default UserProfile;
