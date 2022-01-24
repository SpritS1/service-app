import React from "react";
import "./AuthorizationPage.scss";
import SignInForm from "components/AuthorizationPage/SignInForm/SignInForm";
import SignUpForm from "components/AuthorizationPage/SignUpForm/SignUpForm";

interface Props {}

const AuthorizationPage = (props: Props) => {
  return (
    <div className="authorization-page">
      <SignInForm />
      {/* <SignUpForm /> */}
    </div>
  );
};

export default AuthorizationPage;
