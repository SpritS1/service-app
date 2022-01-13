import React from "react";
import "./HeaderDesktop.scss";
import SortBy from "components/SortBy/SortBy";
import Logo from "components/Logo/Logo";
import SearchBar from "components/SearchBar/SearchBar";

interface Props {}

const HeaderDesktop = (props: Props) => {
  return (
    <header className="header-desktop">
      <h5 className="header-desktop__title">Your devices</h5>
      <SortBy />
      <SearchBar />
      <button className="header-desktop__button">ADD DEVICE</button>
    </header>
  );
};

export default HeaderDesktop;
