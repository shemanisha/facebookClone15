import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import "./style.css";
import LoginInput from "../../inputs/loginInput";
import { useState } from "react";
const loginInfos = {
  email: "",
  password: "",
};

export default function Login() {
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;
  console.log(login);
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email is required.")
      .email("Must be a valid email")
      .max(100, "Must have only 100 character"),
    password: Yup.string().required("Password is required"),
  });
  return (
    <div className="login">
      <div className="login_wrapper">
        <div className="login_wrap">
          <div className="login_1">
            <img src="../../icons/facebook.svg" alt="facebookicon" />
            <span>
              Facebook helps you connect and share with the people in your life.
            </span>
          </div>
          <div className="login_2">
            <div className="login_2_wrap">
              <Formik
                enableReinitialize
                initialValues={{
                  email,
                  password,
                }}
                validationSchema={loginValidation}
              >
                {(fromik) => (
                  <Form>
                    <LoginInput
                      type="text"
                      name="email"
                      placeholder="Email address or Phone number"
                      onChange={handleLoginChange}
                    />
                    <LoginInput
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={handleLoginChange}
                      bottom
                    />
                    <button type="submit" className="blue_button">
                      Log in
                    </button>
                  </Form>
                )}
              </Formik>
              <Link to="/forgot" className="forgot_password">
                Forgotten Password ?
              </Link>
              <div className="sign_splitter"></div>
              <button className="blue_button open_signup">
                Create Account
              </button>
            </div>
            <Link to=" " className="sign_extra">
              <b>Create a page </b>
              for celebrity , brand or business.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
