import React, { useContext } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from "../components/formikControl"; 
import { UserContext } from '../context/user';
import { useNavigate } from 'react-router-dom';

function RegistrationForm() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    password: '',
    phone: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
  });

  const onSubmit = (values, onSubmitProps) => {
    const userPayload = {
      name: values.name,
      email: values.email,
      password: values.password,
      phone_number: values.phone,
      admin: false 
    };

    fetch('http://localhost:5555/users', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(userPayload)
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => { throw error });
        }
        return res.json();
      })
      .then(user => {
        setUser(user);
        navigate('/home');
      })
      .catch(error => {
        console.error("Error:", error);
      });

    onSubmitProps.resetForm();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Sign Up</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {formik => (
          <Form style={styles.form}>
            <div style={styles.inputContainer}>
              <FormikControl control='input' type='text' label='Name' name='name' style={styles.input} />
            </div>
            <div style={styles.inputContainer}>
              <FormikControl control='input' type='email' label='Email' name='email' style={styles.input} />
            </div>
            <div style={styles.inputContainer}>
              <FormikControl control='input' type='password' label='Password' name='password' style={styles.input} />
            </div>
            <div style={styles.inputContainer}>
              <FormikControl control='input' type='text' label='Phone number' name='phone' style={styles.input} />
            </div>
            <button type='submit' disabled={!formik.isValid} style={styles.submitButton}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#e3f2fd',
    padding: '40px',
    borderRadius: '10px',
    width: '400px',
    margin: '0 auto',
    marginTop: '50px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center'
  },
  title: {
    marginBottom: '20px',
    color: '#333'
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
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px'
  }
};

export default RegistrationForm;