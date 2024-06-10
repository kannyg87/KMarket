import React, { useState, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import FormikControl from "../components/formikControl"; 
import { UserContext } from '../context/user';
import { useNavigate } from 'react-router-dom';

function RegistrationForm() {
  const options = [
    { key: 'Email', value: 'emailmoc' },
    { key: 'Telephone', value: 'telephonemoc' }
  ];

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
    modeOfContact: '',
    phone: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Required'),
    password: Yup.string().required('Required'),
    
    modeOfContact: Yup.string().required('Required'),
    phone: Yup.string().when('modeOfContact', {
      is: 'telephonemoc',
      then: () => Yup.string().required('Required')
    })
  });

  const onSubmit = (values, onSubmitProps) => {
    fetch('/users', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
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
            control='radio'
            label='Mode of contact'
            name='modeOfContact'
            options={options}
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
