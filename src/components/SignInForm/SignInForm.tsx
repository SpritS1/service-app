import React, { useEffect, useState } from "react";
import "./SignInForm.scss";
import Input from "components/Input/Input";
import Button from "../Button/Button";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import { spawn } from "child_process";
import ValidationError from "components/ValidationError/ValidationError";

const SignInForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isFormFilled, setIsFormFilled] = useState<boolean>(
    email && password ? true : false
  );

  const navigate = useNavigate();

  const { signIn, error, setError } = useAuth();

  useEffect(() => {
    if (email && password) setIsFormFilled(true);
    else setIsFormFilled(false);
  }, [email, password]);

  // remove errors when change page
  useEffect(() => {
    setError(null);
  }, []);

  return (
    <div className="sign-in-form">
      <h1 className="sign-in-form__title">Sign In</h1>
      <div className="sign-in-form__group sign-in-form__group--inputs">
        <Input
          placeholder="Email"
          type="text"
          value={email}
          setState={setEmail}
          error={error && error.field === "email" ? error.message : null}
          autofocus
        />
        {error && error.field === "email" && (
          <ValidationError message={error.message} />
        )}
        <Input
          placeholder="Password"
          type="password"
          value={password}
          setState={setPassword}
          error={error && error.field === "password" ? error.message : null}
        />
        {error && error.field === "password" && (
          <ValidationError message={error.message} />
        )}
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
        isActive={isFormFilled}
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
