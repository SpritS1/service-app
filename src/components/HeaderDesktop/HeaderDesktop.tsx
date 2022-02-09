import React from "react";
import "./HeaderDesktop.scss";
import SortBy from "components/SortBy/SortBy";
import SearchBar from "components/SearchBar/SearchBar";

interface Props {}

const HeaderDesktop = (props: Props) => {
  return (
    <header className="header-desktop">
      <h5 className="header-desktop__title">Your devices</h5>
      <div className="header-desktop__container-right">
        <SortBy />
        <SearchBar />
        <button className="header-desktop__button">ADD DEVICE</button>
      </div>
    </header>
  );
};

export default HeaderDesktop;
