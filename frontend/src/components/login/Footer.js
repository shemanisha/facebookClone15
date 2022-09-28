import React from "react";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="login_footer">
      <div className="login_footer_wrap">
        <Link to="/">English (UK)</Link>
        <Link to="/">Marathi</Link>
        <Link to="/" className="footer_square">
          <i className="plus_icon"></i>
        </Link>
      </div>
      <div className="footer_splitter"></div>
      <div className="login_footer_wrap">
        <Link to="/">Sign Up</Link>
        <Link to="/">Log in</Link>
        <Link to="/">Messsenger</Link>
        <Link to="/">Facebook</Link>
        <Link to="/">Create Ad</Link>
        <Link to="/">Create Page</Link>
        <Link to="/">Developers</Link>
        <Link to="/">Careers</Link>
        <Link to="">Privacy</Link>
        <Link to="/">Cookies</Link>
        <Link to="/">
          Adchoices
          <i className="adChoices_icon"></i>
        </Link>
        <Link to="/">Terms</Link>
        <Link to="/">Help</Link>
      </div>
      <div className="login_footer_wrap">
        <Link to="/" style={{ fontSize: "12px", marginTop: "10px" }}>
          Meta 2022
        </Link>
      </div>
    </footer>
  );
}
