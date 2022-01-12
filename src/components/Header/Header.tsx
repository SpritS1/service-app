import React, { useState } from "react";
import "./Header.scss";
import SideBar from "components/SideBar/SideBar";
interface Props {}

const Header = (props: Props) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <header className="header">
        <a href="*" className="header__logo">
          YourService
        </a>
        <i
          className="header__bars fas fa-bars"
          onClick={() => setIsActive(!isActive)}
        />
      </header>
      <SideBar isActive={isActive} />
    </>
  );
};

export default Header;
