import React from 'react';
import './IconButton.scss';

interface Props {
    icon: React.ReactNode;
    color: 'blue' | 'red' | 'yellow' | 'green';
    callback: (...args: any[]) => void;
    callbackArguments?: {};
}

const IconButton = ({ icon, color, callback, callbackArguments }: Props) => {
    return (
        <button
            className={`icon-button icon-button--${color}`}
            onClick={() => callback(callbackArguments)}
        >
            {icon}
        </button>
    );
};

export default IconButton;
