// UserProfile.js
import react, { useContext } from "react"
import { UserContext } from "../context/user";
import RegistrationForm from '../components/regestration'

function UserProfile() {
  const {user} =useContext(UserContext)
  return (
    <main>
      <h1>This is user profile component</h1>
      <h1>ues name is: {user.name}</h1>
      <RegistrationForm />
    </main>
  );
}

export default UserProfile;
