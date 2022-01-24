import React from "react";
import "./SignUpForm.scss";
import Input from "components/AuthorizationPage/Input/Input";
import Button from "../Button/Button";

type Props = {};

const SignUpForm = (props: Props) => {
  return (
    <div className="sign-up-form">
      <h1 className="sign-up-form__title">Sign Up</h1>
      <div className="sign-up-form__group sign-up-form__group--inputs">
        <Input placeholder="Email" type="text" />
        <Input placeholder="Password" type="password" />
        <Input placeholder="Confirm password" type="password" />
        <Input placeholder="Phone" type="text" />
      </div>
      <Button text="Sign Up" />
      <span className="sign-up-form__login">
        Already have an account? &nbsp;
        <a href="*" className="sign-up-form__login-link">
          Login
        </a>
      </span>
    </div>
  );
};

export default SignUpForm;
