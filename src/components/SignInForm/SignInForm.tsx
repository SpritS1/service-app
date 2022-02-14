import React, { useState } from "react";
import "./SignInForm.scss";
import Input from "components/Input/Input";
import Button from "../Button/Button";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";

type Props = {};

const SignInForm = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { signIn } = useAuth();

  return (
    <div className="sign-in-form">
      <h1 className="sign-in-form__title">Sign In</h1>
      <div className="sign-in-form__group sign-in-form__group--inputs">
        <Input
          placeholder="Email"
          type="text"
          value={email}
          setState={setEmail}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          setState={setPassword}
        />
      </div>
      <span className="sign-in-form__forgot-password">
        Forgot password? &nbsp;
        <a href="*" className="sign-in-form__forgot-password-link">
          Click Here
        </a>
      </span>
      <Button
        text="Login"
        backgroundColor="white"
        action={() => signIn(email, password, () => navigate("/"))}
      />
      <span className="sign-in-form__sign-up">
        No account yet? &nbsp;
        <Link to="/auth/signup" className="sign-in-form__sign-up-link">
          Sign Up
        </Link>
      </span>
    </div>
  );
};

export default SignInForm;
