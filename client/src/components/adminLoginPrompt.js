import React, { useContext, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../components/formikControl";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";

function AdminLoginPrompt() {
  const [admin, setAdmin] = useState(null)
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
    <div style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form style={styles.form}>
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
              Log In as Admin
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
    width: "400px",
    margin: "0 auto",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  form: {
    textAlign: "left",
  },
  inputContainer: {
    marginBottom: "15px",
    marginRight: '10px'
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