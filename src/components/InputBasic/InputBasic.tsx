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
    required,
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
            {required && !value && (
                <div className="input-basic__required-warning">
                    Field required
                </div>
            )}
        </div>
    );
};

export default InputBasic;
