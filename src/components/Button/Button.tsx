import React from 'react';
import './Button.scss';

type Props = {
    text: string;
    backgroundColor?: 'white' | 'blue';
    action?: (...value: any[]) => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
};

const Button = ({ text, backgroundColor = 'white', action, type = 'button', disabled = false }: Props) => {
    return (
        <button
            type={type}
            className={`button button--${backgroundColor} ${disabled ? 'button--locked' : ''}`}
            onClick={action}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default Button;
