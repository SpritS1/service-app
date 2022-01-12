import React from "react";
import "./Account.scss";

interface Props {}

const Account = (props: Props) => {
  return (
    <div className="account">
      <div className="account__left">
        <i className="account__icon far fa-user" />
        <span className="account__user-name">Marcus Frank</span>
      </div>

      <i className="account__logout fas fa-sign-out-alt"></i>
    </div>
  );
};

export default Account;
