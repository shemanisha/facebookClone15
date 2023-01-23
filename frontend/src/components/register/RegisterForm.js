import React from "react";
import { Form, Formik } from "formik";
import { useState } from "react";
import RegisterInput from "../../inputs/registerInput";
import * as Yup from "yup";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import DotLoader from "react-spinners/DotLoader";

export default function RegisterForm({ setVisible }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfos = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bDay: new Date().getDate(),
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    gender: "",
  };

  const [user, setUser] = useState(userInfos);
  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = user;
  const yearTemp = new Date().getFullYear();
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const years = Array.from(new Array(108), (val, index) => yearTemp - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);

  const registerValidation = Yup.object({
    first_name: Yup.string()
      .required("Whats your first name ?")
      .min(2, "First name must be between 2 and 16 characters")
      .max(16, "First name must be between 2 and 16 characters")
      .matches(
        /^[aA-zZ\s]+$/,
        "Numbers and special characters are not allowed"
      ),
    last_name: Yup.string()
      .required("Whats your last name?")
      .min(2, "Last name must be between 2 and 16 characters")
      .max(16, "Last name must be between 2 and 16 characters")
      .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed"),
    email: Yup.string().required("Enter a valid email address"),
    password: Yup.string()
      .required(
        "Enter a combination of atleast six numbers , letters and punctuation marks"
      )
      .min(6, "Password must be between 6-36 characters")
      .max(36, "Password cant be more than 36 characters"),
  });
  const [dateError, setDateError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const view1 = useMediaQuery({
    query: "(min-width:539px)",
  });
  const view2 = useMediaQuery({
    query: "(min-width:850px)",
  });
  const view3 = useMediaQuery({
    query: "(min-width:1170px)",
  });

  const registerSubmit = async () => {
    try {
      console.log(process.env.REACT_APP_BACKEND_URL);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        {
          first_name,
          last_name,
          email,
          password,
          bYear,
          bMonth,
          bDay,
          gender,
        }
      );
      setError("");
      setSuccess(data.message);
      console.log(data.message);
      const { message, ...rest } = data;

      setTimeout(() => {
        dispatch({ type: "LOGIN", payload: rest });
        Cookies.set("user", JSON.stringify(rest));
        navigate("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };

  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon" onClick={() => setVisible(false)}></i>
          <span>Sign Up</span>
          <span>It's quick and easy</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
          }}
          validationSchema={registerValidation}
          onSubmit={() => {
            let current_date = new Date();
            let picked_date = new Date(bYear, bMonth - 1, bDay);
            let atleast14 = new Date(1970 + 14, 0, 1);
            let noMoreThan70 = new Date(1970 + 70, 0, 1);

            if (current_date - picked_date < atleast14) {
              setDateError(
                " It Looks like you've entered the wrong info .Please make sure that you use your real date of birth"
              );
            } else if (current_date - picked_date > noMoreThan70) {
              setDateError(
                " It Looks like you've entered the wrong info .Please make sure that you use your real date of birth"
              );
            } else if (gender == " ") {
              setDateError("");
              setGenderError(
                " please choose a gender.You can change who can see this later."
              );
            } else {
              setGenderError("");
              setDateError("");
              registerSubmit();
            }
          }}
        >
          {(fromik) => (
            <Form className="register_form">
              <div className="regi_line">
                <RegisterInput
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type="text"
                  name="last_name"
                  placeholder="Last name"
                  onChange={handleRegisterChange}
                  bottom
                />
              </div>
              <div className="regi_line">
                <RegisterInput
                  type="email"
                  name="email"
                  placeholder="Mobile Number or email address"
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type="password"
                  name="password"
                  placeholder="New password"
                  onChange={handleRegisterChange}
                  bottom
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Date of birth <i className="info_icon"></i>
                </div>
                <div
                  className="reg_grid"
                  style={{ marginBottom: `${dateError && !view3 && "95px"}` }}
                >
                  <select
                    name="bDay"
                    value={bDay}
                    onChange={handleRegisterChange}
                  >
                    {days.map((day, i) => {
                      return (
                        <option value={day} key={i}>
                          {day}
                        </option>
                      );
                    })}
                  </select>
                  <select
                    name="bMonth"
                    value={bMonth}
                    onChange={handleRegisterChange}
                  >
                    {months.map((month, i) => {
                      return (
                        <option value={month} key={i}>
                          {month}
                        </option>
                      );
                    })}
                  </select>
                  <select
                    name="bYear"
                    value={bYear}
                    onChange={handleRegisterChange}
                  >
                    {years.map((year, i) => {
                      return (
                        <option value={year} key={i}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                  {dateError && (
                    <div className="input_error">
                      <div className="errow_arrow_bottom"></div>
                      {dateError}{" "}
                    </div>
                  )}
                </div>
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Gender <i className="info_icon"></i>
                </div>
                <div className="reg_grid">
                  <label htmlFor="male">
                    Male
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      onChange={handleRegisterChange}
                    ></input>
                  </label>
                  <label htmlFor="female">
                    Female
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                      onChange={handleRegisterChange}
                    ></input>
                  </label>
                  <label htmlFor="Custom">
                    Custom
                    <input
                      type="radio"
                      name="gender"
                      id="custom"
                      value="custom"
                      onChange={handleRegisterChange}
                    ></input>
                  </label>
                  {genderError && (
                    <div className="input_error">
                      <div className="errow_arrow_bottom"></div>
                      {genderError}{" "}
                    </div>
                  )}
                </div>
              </div>
              <div className="reg_infos">
                By clicking Sign Up, you agree to our{" "}
                <span>Terms, Data Policy &nbsp;</span>
                and<span> &nbsp; Cookie Policy &nbsp;</span> You may receive SMS
                notifications from us and can opt out any at any time.
              </div>
              <div className="reg_btn_wrapper ">
                <button className="blue_btn open_signup blue_button">
                  Sign Up
                </button>
              </div>
              {success && <div className="success_text">{success}</div>}
              {error && <div className="error_text">{error}</div>}
              <DotLoader color="#1876f2" loading={loading} size={150} />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
