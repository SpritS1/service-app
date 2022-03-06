import React, { useEffect, useState, useRef } from 'react';
import './SelectButton.scss';

type Props = {
    text: string;
    options: string[];
    selectedOption: string | null;
    setSelectedOption: React.Dispatch<React.SetStateAction<string | null>>;
    resetText?: string;
};

const SelectButton = ({
    text,
    options,
    selectedOption,
    setSelectedOption,
    resetText,
}: Props) => {
    const [isActive, setIsActive] = useState<boolean>(false);

    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const isClickOutside = (e: MouseEvent) => {
            if (
                buttonRef.current &&
                !buttonRef.current.contains(e.target as Node)
            )
                setIsActive(false);
        };

        document.addEventListener('mousedown', isClickOutside);

        return () => {
            document.removeEventListener('mousedown', isClickOutside);
        };
    }, []);

    return (
        <button
            ref={buttonRef}
            className={`select-button ${isActive ? 'active' : ''}`}
            onClick={() => setIsActive(!isActive)}
        >
            <div className="select-button__text">
                {selectedOption ? selectedOption : text}
            </div>
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
                {resetText && (
                    <li
                        className="select-button__dropdown-item select-button__dropdown-item--unset"
                        onClick={() => setSelectedOption(null)}
                    >
                        {resetText}
                    </li>
                )}
                {options.map((option) => (
                    <li
                        className="select-button__dropdown-item"
                        onClick={() => setSelectedOption(option)}
                        key={option}
                    >
                        {option}
                    </li>
                ))}
            </ul>
        </button>
    );
};

export default SelectButton;
