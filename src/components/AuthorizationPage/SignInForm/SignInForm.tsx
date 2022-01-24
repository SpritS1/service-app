import React from "react";
import "./SignInForm.scss";
import Input from "components/AuthorizationPage/Input/Input";
import Button from "../Button/Button";

type Props = {};

const SignInForm = (props: Props) => {
  return (
    <div className="sign-in-form">
      <h1 className="sign-in-form__title">Sign In</h1>
      <div className="sign-in-form__group sign-in-form__group--inputs">
        <Input placeholder="Email" type="text" />
        <Input placeholder="Password" type="password" />
      </div>
      <span className="sign-in-form__forgot-password">
        Forgot password? &nbsp;
        <a href="*" className="sign-in-form__forgot-password-link">
          Click Here
        </a>
      </span>
      <Button text="Login" />
      <span className="sign-in-form__sign-up">
        No account yet? &nbsp;
        <a href="*" className="sign-in-form__sign-up-link">
          Sign Up
        </a>
      </span>
    </div>
  );
};

export default SignInForm;
