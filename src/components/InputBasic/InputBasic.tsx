import React from 'react';
import './InputBasic.scss';

interface Props {
    placeholder: string;
    value: string | number;
    setState: any;
    type: React.HTMLInputTypeAttribute;
    required?: boolean;
    icon?: string;
    autofocus?: boolean;
    error?: string | null;
    autoComplete?: string;
    disabled?: boolean;
}

const InputBasic = ({
    placeholder,
    value,
    setState,
    type,
    disabled = false,
}: Props) => {
    const handleChange = (
        setState: (e: string) => void,
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        setState(e.currentTarget.value);
    };

    return (
        <div className="input-basic">
            <label htmlFor={placeholder} className="input-basic__label">
                {placeholder}
            </label>
            <input
                id={placeholder}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => handleChange(setState, e)}
                disabled={disabled}
                className={`input-basic__input ${
                    disabled ? 'input-basic__input--read-only' : ''
                }`}
            />
        </div>
    );
};

export default InputBasic;
