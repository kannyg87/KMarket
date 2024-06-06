import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from "../components/formikControl";
import { UserContext } from '../context/user';

function Login() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

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
    const foundUser = user && user.find(u => u.email === values.email && u.password === values.password);
    if (foundUser) {
      setUser(foundUser);
      navigate('/home');
    } else {
      alert('Invalid email or password');
    }

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
          <button type='submit' disabled={!formik.isValid}>
            Login
          </button>
          <button type='button' onClick={() => navigate('/signup')}>
            Signup
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default Login;
