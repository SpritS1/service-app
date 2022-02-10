import React from "react";
import "./IconButton.scss";

interface Props {
  icon: React.ReactNode;
}

const IconButton = ({ icon }: Props) => {
  return <button className="action-button">{icon}</button>;
};

export default IconButton;
