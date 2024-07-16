// UserProfile.js
import react, { useContext } from "react";
import { UserContext } from "../context/user";
import Header from "../components/Header";

function UserProfile() {
  const { user } = useContext(UserContext);
  return (
    <main>
      <Header />
      <h1>This is user profile component</h1>
      <h1>user name is: {user.name}</h1>
      <h1>user email is: {user.email}</h1>
    </main>
  );
}

export default UserProfile;
