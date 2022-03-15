import React from 'react';
import './Button.scss';

type Props = {
    text: string;
    backgroundColor?: 'white' | 'blue';
    action?: () => void;
    disabled?: boolean;
};

const Button = ({
    text,
    backgroundColor = 'white',
    action,
    disabled = false,
}: Props) => {
    return (
        <button
            className={`button button--${backgroundColor} ${
                disabled ? 'button--locked' : ''
            }`}
            onClick={action}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default Button;
