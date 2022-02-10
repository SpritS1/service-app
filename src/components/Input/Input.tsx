import React, { HTMLInputTypeAttribute } from "react";
import "./Input.scss";

interface Props {
  placeholder: string;
  value: string | number;
  onChange: any;
  type: HTMLInputTypeAttribute;
  required?: boolean;
  icon?: string;
}

const Input = ({
  placeholder,
  value,
  onChange,
  type,
  required,
  icon,
}: Props) => {
  return (
    <div className="input">
      <i className="input__icon" />
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e)}
        className="input__input"
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default Input;
