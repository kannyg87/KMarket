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
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required')
  });

  const onSubmit = (values, onSubmitProps) => {
    console.log("values", values);
    fetch('http://localhost:5555/logins', {
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
    <div style={styles.container}>
      <h2 style={styles.title}>{signUp ? "Sign Up" : "Log In"}</h2>
      <button onClick={handleClick} style={styles.toggleButton}>
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
            <Form style={styles.form}>
              <div style={styles.inputContainer}>
                <FormikControl control='input' type='email' label='Email' name='email' style={styles.input} />
              </div>
              <div style={styles.inputContainer}>
                <FormikControl control='input' type='password' label='Password' name='password' style={styles.input} />
              </div>
              <button type='submit' disabled={!formik.isValid} style={styles.submitButton}>
                Log In
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#f0f4f8',
    padding: '40px',
    borderRadius: '10px',
    width: '500px',
    margin: '0 auto',
    marginTop: '100px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center'
  },
  title: {
    marginBottom: '20px',
    color: '#333'
  },
  toggleButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '20px'
  },
  form: {
    textAlign: 'left'
  },
  inputContainer: {
    marginBottom: '15px'
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc'
  },
  submitButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px'
  }
};

export default Login;