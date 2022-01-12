import React from "react";
import "./ActionButton.scss";

interface Props {
  icon: React.ReactNode;
}

const ActionButton = ({ icon }: Props) => {
  return <button className="action-button">{icon}</button>;
};

export default ActionButton;
