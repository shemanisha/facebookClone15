import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import LoginInput from "../../inputs/loginInput";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import DotLoader from "react-spinners/DotLoader";

const loginInfos = {
  email: "",
  password: "",
};
export default function LoginForm({ setVisible }) {
  const [login, setLogin] = useState(loginInfos);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, password } = login;

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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const loginSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        {
          email,
          password,
        }
      );
      setError("");
      setSuccess(data.message);
      console.log(data);
      dispatch({ type: "LOGIN", payload: data });
      Cookies.set("user", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };

  return (
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
            onSubmit={() => {
              loginSubmit();
            }}
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
          <DotLoader color="#1876f2" loading={loading} size={150} />
          {error && <div className="error_txt">{error}</div>}
          <div className="sign_splitter"></div>
          <button
            className="blue_button open_signup"
            onClick={() => setVisible(true)}
          >
            Create Account
          </button>
        </div>
        <Link to="/" className="sign_extra">
          <b>Create a page </b>
          for celebrity , brand or business.
        </Link>
      </div>
    </div>
  );
}
