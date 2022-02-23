import React from 'react';
import './IconButton.scss';

interface Props {
    icon: React.ReactNode;
    color: 'blue' | 'red' | 'yellow' | 'green';
}

const IconButton = ({ icon, color }: Props) => {
    return (
        <button className={`action-button action-button--${color}`}>
            {icon}
        </button>
    );
};

export default IconButton;
