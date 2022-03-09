import React, { HTMLInputTypeAttribute } from 'react';
import './InputBorderless.scss';

interface Props {
    placeholder: string;
    value: string | number;
    setState: any;
    type: HTMLInputTypeAttribute;
    required?: boolean;
    icon?: string;
    autofocus?: boolean;
    error?: string | null;
    autoComplete?: string;
}

const InputBorderless = ({
    placeholder,
    value,
    setState,
    type,
    required,
    icon,
    autofocus,
    error,
    autoComplete = 'on',
}: Props) => {
    const handleChange = (
        setState: (e: string) => void,
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        setState(e.currentTarget.value);
    };

    return (
        <div className="input-borderless">
            {icon && <i className={`input-borderless__icon ${icon}`} />}
            <input
                className={`input-borderless__inputfield ${
                    error ? 'input-borderless__inputfield--error' : ''
                }`}
                type={type}
                value={value}
                onChange={(e) => handleChange(setState, e)}
                placeholder={placeholder}
                required={required}
                autoFocus={autofocus}
                autoComplete={autoComplete}
            />
        </div>
    );
};

export default InputBorderless;
