import React from "react";
import "./Header.scss";

interface Props {}

const Header = (props: Props) => {
  return (
    <header className="header">
      <a href="*" className="header__logo">
        YourService
      </a>
      <i className="header__bars fas fa-bars"></i>
    </header>
  );
};

export default Header;
