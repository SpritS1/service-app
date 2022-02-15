import { useState, useEffect } from "react";
import "./SignUpForm.scss";
import Input from "components/Input/Input";
import Button from "../Button/Button";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import ValidationError from "components/ValidationError/ValidationError";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [isFormFilled, setIsFormFilled] = useState<boolean>(
    email && password && confirmedPassword ? true : false
  );

  const navigate = useNavigate();
  const { signUp, error, setError } = useAuth();

  useEffect(() => {
    if (email && password && confirmedPassword) setIsFormFilled(true);
    else setIsFormFilled(false);
  }, [email, password, confirmedPassword]);

  // remove errors when change page
  useEffect(() => {
    setError(null);
  }, []);

  return (
    <div className="sign-up-form">
      <h1 className="sign-up-form__title">Sign Up</h1>
      <div className="sign-up-form__group sign-up-form__group--inputs">
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
          error={error && error.field === "password" ? error.message : null}
          setState={setPassword}
        />
        {error && error.field === "password" && (
          <ValidationError message={error.message} />
        )}
        <Input
          placeholder="Confirm password"
          type="password"
          value={confirmedPassword}
          error={
            error && error.field === "confirmPassword" ? error.message : null
          }
          setState={setConfirmedPassword}
        />
        {error && error.field === "confirmPassword" && (
          <ValidationError message={error.message} />
        )}
      </div>
      <Button
        text="Sign Up"
        backgroundColor="white"
        action={() => signUp(email, password, () => navigate("/"))}
        isActive={isFormFilled}
      />
      <span className="sign-up-form__login">
        Already have an account? &nbsp;
        <Link to="/auth/login" className="sign-up-form__login-link">
          Login
        </Link>
      </span>
    </div>
  );
};

export default SignUpForm;
