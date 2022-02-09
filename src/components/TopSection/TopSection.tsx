import React from "react";
import "./TopSection.scss";
import Button from "components/Button/Button";

interface Props {}

const TopSection = (props: Props) => {
  return (
    <div className="top-section">
      <h5 className="top-section__title">Your devices</h5>
      <Button text="ADD DEVICE" backgroundColor="blue" />
    </div>
  );
};

export default TopSection;
