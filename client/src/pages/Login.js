import React from "react";
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from "../components/formikControl";

function Login() {
  const navigate = useNavigate();

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
    console.log("form Data", values);
    onSubmitProps.resetForm();
  };

  const redirectToProfile = () => {
    navigate('/profile'); 
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
          <button type='submit' disabled={!formik.isValid}>
            Login
          </button>
          <button type='button' onClick={redirectToProfile}>
            Signup
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default Login;
