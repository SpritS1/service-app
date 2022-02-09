import React from "react";
import "./Button.scss";

type Props = {
  text: string;
  backgroundColor?: "white" | "blue";
};

const Button = ({ text, backgroundColor }: Props) => {
  return (
    <button className={`button button--${backgroundColor}`}>{text}</button>
  );
};

export default Button;
