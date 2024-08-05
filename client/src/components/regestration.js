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
    <div className="bg-blue-100 p-6 rounded-lg w-full max-w-md mx-auto mt-12 shadow-md text-center">
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">Sign Up</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {formik => (
          <Form className="text-left">
            <div className="mb-4">
              <FormikControl control='input' type='text' label='Name' name='name' className="w-full p-3 border border-gray-300 rounded-md" />
            </div>
            <div className="mb-4">
              <FormikControl control='input' type='email' label='Email' name='email' className="w-full p-3 border border-gray-300 rounded-md" />
            </div>
            <div className="mb-4">
              <FormikControl control='input' type='password' label='Password' name='password' className="w-full p-3 border border-gray-300 rounded-md" />
            </div>
            <div className="mb-4">
              <FormikControl control='input' type='text' label='Phone number' name='phone' className="w-full p-3 border border-gray-300 rounded-md" />
            </div>
            <button 
              type='submit' 
              disabled={!formik.isValid} 
              className="w-full py-3 bg-blue-500 text-white rounded-md cursor-pointer text-lg"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RegistrationForm;
