import React, { useState } from 'react';
import './SelectButton.scss';

type Props = {
    text: string;
    options: string[];
};

const SelectButton = ({ text, options }: Props) => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    return (
        <button
            className={`select-button ${isActive ? 'active' : ''}`}
            onClick={() => setIsActive(!isActive)}
        >
            {selectedOption ? selectedOption : text}
            <i
                className={`select-button__icon ${
                    isActive ? 'active' : ''
                } fa-solid fa-caret-down`}
            ></i>
            <ul
                className={`select-button__dropdown ${
                    isActive ? 'active' : ''
                }`}
            >
                {options.map((option) => (
                    <li
                        className="select-button__dropdown-item"
                        onClick={() => setSelectedOption(option)}
                    >
                        {option}
                    </li>
                ))}
            </ul>
        </button>
    );
};

export default SelectButton;
