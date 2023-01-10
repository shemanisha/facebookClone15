import React from "react";
import { useState } from "react";
import Footer from "../../components/login/Footer";
import LoginForm from "../../components/login/LoginForm";
import RegisterForm from "../../components/register/RegisterForm";
import "./style.css";

export default function Login() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm setVisible={setVisible} />
        {visible && <RegisterForm setVisible={setVisible} />}
        <RegisterForm />
        <Footer />
      </div>
    </div>
  );
}
