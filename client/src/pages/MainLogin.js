import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user';
import Login from "../components/login";
import RegistrationForm from "../components/regestration";

function MainLogin() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [signUp, setSignUp] = useState(false);

  const handleClick = () => setSignUp(signUp => !signUp);

  return (
    <>
      <h2>
        {signUp ? <RegistrationForm /> : <Login />}
        <button onClick={handleClick}>
          {signUp ? "Log In" : "Register Now"}
        </button>
      </h2>
    </>
  );
}

export default MainLogin;
