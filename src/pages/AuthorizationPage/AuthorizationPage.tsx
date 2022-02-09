import React from "react";
import "./AuthorizationPage.scss";
import SignInForm from "components/SignInForm/SignInForm";
import SignUpForm from "components/SignUpForm/SignUpForm";
import { useParams } from "react-router-dom";

interface Props {}

const AuthorizationPage = (props: Props) => {
  const { authType } = useParams();

  return (
    <div className="authorization-page">
      {authType === "login" && <SignInForm />}
      {authType === "signup" && <SignUpForm />}
    </div>
  );
};

export default AuthorizationPage;
