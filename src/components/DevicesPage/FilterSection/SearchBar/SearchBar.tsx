import React from "react";
import "./SearchBar.scss";

interface Props {}

const SearchBar = (props: Props) => {
  return (
    <div className="search-bar">
      <input className="search-bar__input" placeholder="Find device..." />
      <i className="search-bar__icon fas fa-search" />
    </div>
  );
};

export default SearchBar;
