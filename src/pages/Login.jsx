import React from "react";
import "./Login.scss";
import { Sidebar } from "../components/Sidebar.jsx";

const Login = () => {
  return (
    <>
      <Sidebar />

      <section className="login-section">
        <div className="text">Login</div>
      </section>
    </>
  );
};

export default Login;
