import "./Account.scss";
import { useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";

interface Props {}

const Account = (props: Props) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  console.log();

  return (
    <div className="account">
      <div className="account__left">
        <i className="account__icon far fa-user" />
        <span className="account__user-name">{user && user.email}</span>
      </div>

      <i
        className="account__logout fas fa-sign-out-alt"
        onClick={() => logout(() => navigate("/auth/login"))}
      />
    </div>
  );
};

export default Account;
