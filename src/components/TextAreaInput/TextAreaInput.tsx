import React from 'react';
import './TextAreaInput.scss';

type Props = { value: string; label: string; onChange: any };

const TextAreaInput = ({ value, onChange, label }: Props) => {
    return (
        <div className="text-area-input">
            <label htmlFor="" className="text-area-input__label">
                {label}
            </label>
            <textarea
                className="text-area-input__textarea"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            ></textarea>
        </div>
    );
};

export default TextAreaInput;
