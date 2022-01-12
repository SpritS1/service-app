import React from "react";
import Account from "./Account";
import "./SideBar.scss";

interface Props {}

const SideBar = (props: Props) => {
  return (
    <div className="sidebar">
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
