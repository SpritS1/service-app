import React from "react";
import "./SortBy.scss";

interface Props {}

const SortBy = (props: Props) => {
  return (
    <div className="sort-by">
      <span className="sort-by__text">Sort By:</span>
      <button className="sort-by__select">Name</button>
    </div>
  );
};

export default SortBy;
