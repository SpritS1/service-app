import React from "react";
import "./Button.scss";

type Props = {
  text: string;
  backgroundColor?: "white" | "blue";
  action?: () => void;
  isActive?: boolean;
};

const Button = ({ text, backgroundColor, action, isActive = true }: Props) => {
  return (
    <button
      className={`button button--${backgroundColor} ${
        isActive ? "" : "button--locked"
      }`}
      onClick={action}
    >
      {text}
    </button>
  );
};

export default Button;
