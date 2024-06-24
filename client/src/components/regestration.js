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
    email: Yup.string()
      .email('Invalid email format')
      .required('Required'),
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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {formik => (
        <Form className="registration-form">
          <FormikControl
            control='input'
            type='text'
            label='Name'
            name='name'
          />
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
          <FormikControl
            control='input'
            type='text'
            label='Phone number'
            name='phone'
          />
          <button type='submit' disabled={!formik.isValid}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default RegistrationForm;