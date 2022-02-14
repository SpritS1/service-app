import { useState } from "react";
import "./SignUpForm.scss";
import Input from "components/Input/Input";
import Button from "../Button/Button";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";

type Props = {};

const SignUpForm = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const navigate = useNavigate();
  const { signUp } = useAuth();

  return (
    <div className="sign-up-form">
      <h1 className="sign-up-form__title">Sign Up</h1>
      <div className="sign-up-form__group sign-up-form__group--inputs">
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
        <Input
          placeholder="Confirm password"
          type="password"
          value={confirmedPassword}
          setState={setConfirmedPassword}
        />
        {/* <Input placeholder="Phone" type="text" /> */}
      </div>
      <Button
        text="Sign Up"
        backgroundColor="white"
        action={() => signUp(email, password, () => navigate("/"))}
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
