import "./AuthorizationPage.scss";
import SignInForm from "components/SignInForm/SignInForm";
import SignUpForm from "components/SignUpForm/SignUpForm";
import { Route, Routes } from "react-router-dom";

interface Props {}

const AuthorizationPage = (props: Props) => {
  return (
    <div className="authorization-page">
      <Routes>
        <Route path="login" element={<SignInForm />} />
        <Route path="signup" element={<SignUpForm />} />
      </Routes>
    </div>
  );
};

export default AuthorizationPage;
