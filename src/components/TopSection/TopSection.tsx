import React from "react";
import "./TopSection.scss";

interface Props {}

const TopSection = (props: Props) => {
  return (
    <div className="top-section">
      <h5 className="top-section__title">Your devices</h5>
      <button className="top-section__button">ADD DEVICE</button>
    </div>
  );
};

export default TopSection;
