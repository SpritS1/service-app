import React, { HTMLInputTypeAttribute } from "react";
import "./Input.scss";

interface Props {
  placeholder: string;
  value: string | number;
  setState: any;
  type: HTMLInputTypeAttribute;
  required?: boolean;
  icon?: string;
}

const Input = ({
  placeholder,
  value,
  setState,
  type,
  required,
  icon,
}: Props) => {
  const handleChange = (
    setState: (e: string) => void,
    e: React.FormEvent<HTMLInputElement>
  ) => {
    setState(e.currentTarget.value);
  };

  return (
    <div className="input">
      <i className="input__icon" />
      <input
        type={type}
        value={value}
        onChange={(e) => handleChange(setState, e)}
        className="input__input"
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default Input;
