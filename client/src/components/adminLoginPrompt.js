import React, { useContext, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../components/formikControl";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";

function AdminLoginPrompt() {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = (values, onSubmitProps) => {
    fetch("http://127.0.0.1:5555/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((adminData) => {
        setAdmin(adminData);
        navigate("/adminlog");
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    onSubmitProps.resetForm();
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg max-w-md mx-auto mt-10">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className="space-y-6">
            <div>
              <FormikControl
                control="input"
                type="email"
                label="Email"
                name="email"
                className="w-80 p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <FormikControl
                control="input"
                type="password"
                label="Password"
                name="password"
                className="w-80 p-3 border border-gray-300 rounded-md"
              />
            </div>
            <button
              type="submit"
              disabled={!formik.isValid}
              className="w-80 py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Log In as Admin
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AdminLoginPrompt;
