import React ,{useState} from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Formik } from "formik";

const initialValues = { email: "", password: ""};

const validateForm = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (values.password.length < 8) {
    errors.password = "Need at least 8 characters";
  }
  return errors;
};

const Login = ({ loginSuccess, title }) => {
    const [showLoginSuccess, setShowLoginSuccess] = useState(false);
    const handleSubmit = (values, { setSubmitting }) => {
      axios({
        method: 'GET',
        url: 'https://60dff0ba6b689e001788c858.mockapi.io/token',
        data: values
      }).then(response => {
        setSubmitting(false);
        setShowLoginSuccess(true);
        loginSuccess({ userId: response.data.userId, token: response.data.token });
        axios.defaults.headers.common['Authorization'] = response.data.token;
      }).catch(() => {
        setSubmitting(false);
      })
    };
  return (
    <div className="login-control">
      <Container>
        <h1 className="login-title">Login</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validate={validateForm}
        >
          { ({errors , values ,touched, isSubmitting,handleChange,
            handleBlur}) => (
          <Form>
            <Form.Control
              className="form--input"
              type="text"
              placeholder="Email"
              name="email"
              value={values.email}
              isInvalid={touched.email && errors.email}
              onChange={handleChange}
              onBlur={handleBlur}
            /> <br/>
            <Form.Control.Feedback type="invalid">
                  {errors.email}
            </Form.Control.Feedback>
            <Form.Control
              className="form--input"
              type="password"
              placeholder="Password"
              name="password"
              value={values.password}
              isInvalid={touched.password && errors.password}
              onChange={handleChange}
                onBlur={handleBlur}
            /><br/>
            <Form.Control.Feedback type="invalid">
                  {errors.password}
            </Form.Control.Feedback>
            <button
              className="form--button-submit"
              type="submit"
              disabled={ isSubmitting }
            >
              Submit
            </button>
            { showLoginSuccess &&
            <div className="form--login-success">
              Login success
            </div> }
          </Form>) }
        </Formik>
      </Container>
    </div>
  );
};

export default Login;