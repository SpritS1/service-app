import React, { HTMLInputTypeAttribute } from "react";
import "./Input.scss";

interface Props {
  placeholder: string;
  value: string | number;
  setState: any;
  type: HTMLInputTypeAttribute;
  required?: boolean;
  icon?: string;
  autofocus?: boolean;
  error?: string | null;
}

const Input = ({
  placeholder,
  value,
  setState,
  type,
  required,
  icon,
  autofocus,
  error,
}: Props) => {
  const handleChange = (
    setState: (e: string) => void,
    e: React.FormEvent<HTMLInputElement>
  ) => {
    setState(e.currentTarget.value);
  };

  return (
    <div className="input">
      {icon && <i className={`input__icon ${icon}`} />}
      <input
        className={`input__inputfield ${
          error ? "input__inputfield--error" : ""
        }`}
        type={type}
        value={value}
        onChange={(e) => handleChange(setState, e)}
        placeholder={placeholder}
        required={required}
        autoFocus={autofocus}
      />
    </div>
  );
};

export default Input;
