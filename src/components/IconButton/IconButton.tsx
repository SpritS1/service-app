import React from 'react';
import './IconButton.scss';

interface Props {
    iconName: string;
    color: 'blue' | 'red' | 'yellow' | 'green';
    onClick: (...args: any[]) => void;
}

const IconButton = ({ iconName, color, onClick }: Props) => {
    return (
        <button
            className={`icon-button icon-button--${color}`}
            onClick={() => onClick()}
        >
            <i className={`icon-button__icon ${iconName}`}></i>
        </button>
    );
};

export default IconButton;
