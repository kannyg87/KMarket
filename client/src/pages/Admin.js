import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../components/formikControl";

function AdminLoginPrompt({ onSubmit, setAdminStatus }) {
  const [isAdmin, setIsAdmin] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().when("isAdmin", {
      is: true,
      then: Yup.string().required("Required"),
      otherwise: Yup.string().notRequired(),
    }),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleAdminChange = (e) => {
    const isAdminChecked = e.target.checked;
    setIsAdmin(isAdminChecked);
    setAdminStatus(isAdminChecked);
  };

  return (
    <div style={styles.container}>
      <label>
        <input type="checkbox" checked={isAdmin} onChange={handleAdminChange} />
        Are you an admin?
      </label>
      <Formik
        initialValues={{ ...initialValues, isAdmin }}
        validationSchema={validationSchema}
        onSubmit={(values, onSubmitProps) => {
          onSubmit(values, onSubmitProps);
        }}
      >
        {(formik) => (
          <Form style={styles.form}>
            {isAdmin && (
              <div style={styles.inputContainer}>
                <FormikControl
                  control="input"
                  type="text"
                  label="Name"
                  name="name"
                  style={styles.input}
                />
              </div>
            )}
            <div style={styles.inputContainer}>
              <FormikControl
                control="input"
                type="email"
                label="Email"
                name="email"
                style={styles.input}
              />
            </div>
            <div style={styles.inputContainer}>
              <FormikControl
                control="input"
                type="password"
                label="Password"
                name="password"
                style={styles.input}
              />
            </div>
            <button
              type="submit"
              disabled={!formik.isValid}
              style={styles.submitButton}
            >
              {isAdmin ? "Log In as Admin" : "Log In"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f0f4f8",
    borderRadius: "10px",
    width: "500px",
    margin: "0 auto",
    marginTop: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  form: {
    textAlign: "left",
  },
  inputContainer: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  submitButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default AdminLoginPrompt;