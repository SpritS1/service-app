import React, { useState } from "react";
import Account from "./Account/Account";
import "./SideBar.scss";

interface Props {
  isActive: boolean;
}

const SideBar = ({ isActive }: Props) => {
  return (
    <div className={`sidebar ${isActive && "active"}`}>
      <a href="*" className="sidebar__logo">
        Service X
      </a>
      <Account />
      <nav className="sidebar__nav">
        <a href="*" className="sidebar__nav-link active">
          Devices
        </a>
        <a href="*" className="sidebar__nav-link">
          Service requests
        </a>
        <a href="*" className="sidebar__nav-link">
          Contact
        </a>
        <a href="*" className="sidebar__nav-link">
          Profile
        </a>
      </nav>
    </div>
  );
};

export default SideBar;
