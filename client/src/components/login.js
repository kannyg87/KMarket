import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from "../components/formikControl";
import { UserContext } from '../context/user';
import RegistrationForm from "../components/regestration";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [signUp, setSignUp] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Required'),
    password: Yup.string().required('Required'),
  });

  const onSubmit = (values, onSubmitProps) => {
    const url = signUp ? '/users' : '/login';
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })
    .then(res => res.json())
    .then(user => {
      setUser(user);
      navigate('/home');
    })
    .catch(error => {
      console.error("Error:", error);
    });

    onSubmitProps.resetForm();
  };

  const handleClick = () => setSignUp(prevSignUp => !prevSignUp);

  return (
    <div>
      <h2>{signUp ? "Sign Up" : "Log In"}</h2>
      <button onClick={handleClick}>
        {signUp ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
      </button>
      {signUp ? (
        <RegistrationForm />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {formik => (
            <Form className="registration-form">
              <FormikControl
                control='input'
                type='email'
                label='Email'
                name='email'
              />
              <FormikControl
                control='input'
                type='password'
                label='Password'
                name='password'
              />
              <button type='submit' disabled={!formik.isValid}>
                Log In
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}

export default Login;
