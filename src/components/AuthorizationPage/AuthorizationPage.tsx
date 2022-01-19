import React from "react";
import "./AuthorizationPage.scss";
import Input from "./Input/Input";

interface Props {}

const AuthorizationPage = (props: Props) => {
  return (
    <div className="authorization-page">
      <div className="authorization-page__form">
        <h1 className="authorization-page__title">Sign In</h1>
        <Input placeholder="Email" type="text" />
        <Input placeholder="Password" type="password" />
        <span className="authorization-page__secondary-text">
          Forgot password? Click Here
        </span>
        <span className="authorization-page__secondary-text">
          Don't have an account? Register Here
        </span>

        <button className="action-button">Login</button>
      </div>
    </div>
  );
};

export default AuthorizationPage;
