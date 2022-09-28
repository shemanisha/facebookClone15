import React from "react";
import Footer from "../../components/login/Footer";
import LoginForm from "../../components/login/LoginForm";
import RegisterForm from "../../components/register/RegisterForm";
import "./style.css";

export default function Login() {
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm />
        <RegisterForm />
        <Footer />
      </div>
    </div>
  );
}
