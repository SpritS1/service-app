import { useEffect } from 'react';
import './Dropdown.scss';

type Props = {
    options: string[];
    isActive: boolean;
    setIsActive: (boolean: boolean) => void;
    setSelectedOption: (option: string) => void;
};

const Dropdown = ({
    options,
    isActive,
    setSelectedOption,
    setIsActive,
}: Props) => {
    useEffect(() => {
        const isClickOutside = (e: MouseEvent) => {
            if (isActive && e.target !== e.currentTarget) setIsActive(false);
            console.log(isActive);
        };

        document.addEventListener('mousedown', isClickOutside);

        return () => {
            document.removeEventListener('mousedown', isClickOutside);
        };
    }, [setIsActive, isActive]);

    return (
        <ul className={`dropdown ${isActive ? 'active' : ''}`}>
            {options.map((option) => (
                <li
                    className="dropdown__item"
                    onClick={() => setSelectedOption(option)}
                    key={option}
                >
                    {option}
                </li>
            ))}
        </ul>
    );
};

export default Dropdown;
