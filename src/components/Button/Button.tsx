import React from "react";
import "./Button.scss";

type Props = {
  text: string;
  backgroundColor?: "white" | "blue";
  action?: () => void;
};

const Button = ({ text, backgroundColor, action }: Props) => {
  return (
    <button className={`button button--${backgroundColor}`} onClick={action}>
      {text}
    </button>
  );
};

export default Button;
