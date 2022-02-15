import React, { useState } from "react";
import { Link } from "react-router-dom";
import Account from "./Account/Account";
import Logo from "components/Logo/Logo";
import "./SideBar.scss";

interface Props {
  isActive: boolean;
}

const SideBar = ({ isActive }: Props) => {
  return (
    <div className={`sidebar ${isActive && "active"}`}>
      <div className="sidebar__logo-container">
        <Logo />
      </div>
      <Account />
      <nav className="sidebar__nav">
        <Link to="/" className="sidebar__nav-link active">
          Devices
        </Link>
        <Link to="/" className="sidebar__nav-link">
          Service requests
        </Link>
        <Link to="/" className="sidebar__nav-link">
          Contact
        </Link>
        <Link to="/" className="sidebar__nav-link">
          Profile
        </Link>
      </nav>
    </div>
  );
};

export default SideBar;
