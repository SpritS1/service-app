import React from "react";
import "./Button.scss";

type Props = {
  text: string;
};

const Button = ({ text }: Props) => {
  return <button className="button">{text}</button>;
};

export default Button;
