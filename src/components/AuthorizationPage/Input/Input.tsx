import React, { HTMLInputTypeAttribute } from "react";
import { StringLiteral } from "typescript";
import { InputType } from "zlib";
import "./Input.scss";

interface Props {
  placeholder: string;
  type: HTMLInputTypeAttribute;
  icon?: string;
}

const Input = ({ placeholder, type, icon }: Props) => {
  return (
    <div className="input">
      <i className="input__icon" />
      <input type={type} className="input__input" placeholder={placeholder} />
    </div>
  );
};

export default Input;
