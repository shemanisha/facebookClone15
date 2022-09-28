import React from "react";
import { Form, Formik } from "formik";
import { useState } from "react";
import RegisterInput from "../../inputs/registerInput";

export default function RegisterForm() {
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
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const years = Array.from(new Array(108), (val, index) => bYear - index);
  console.log(years, bYear);
  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon"></i>
          <span>Sign Up</span>
          <span>It's quick and easy</span>
        </div>
        <Formik>
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
                />
              </div>
              <div className="regi_line">
                <RegisterInput
                  type="text"
                  name="email"
                  placeholder="Mobile Number or email address"
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type="password"
                  name="new_password"
                  placeholder="New password"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Date of birth <i className="info_icon"></i>
                </div>
                <div className="reg_grid">
                  <select name="bDay">
                    <option>15</option>
                  </select>
                  <select name="bMonth">
                    <option>15</option>
                  </select>
                  <select name="bYear">
                    {years.map((year, i) => {
                      <option value={year} key={i}>
                        {year}
                      </option>;
                    })}
                  </select>
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
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
