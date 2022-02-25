import { useEffect, useState, useRef } from 'react';
import './SelectButton.scss';

type Props = {
    text: string;
    options: string[];
};

const SelectButton = ({ text, options }: Props) => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

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
