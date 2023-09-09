import React, { InputHTMLAttributes } from 'react';
import './FormikInput.scss';
import { FieldInputProps, FieldMetaProps } from 'formik';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    field: FieldInputProps<any>;
    meta: FieldMetaProps<any>;
    placeholder: string;
    type: React.HTMLInputTypeAttribute;
    disabled?: boolean;
    hasLabel?: boolean;
}

const FormikInput = ({ field, meta, placeholder, type, disabled = false, hasLabel = true }: Props) => {
    return (
        <div className="input-basic">
            {hasLabel && (
                <label htmlFor={placeholder} className="input-basic__label">
                    {placeholder}
                </label>
            )}
            <input
                {...field}
                id={placeholder}
                type={type}
                placeholder={hasLabel ? '' : placeholder}
                disabled={disabled}
                className={`input-basic__input ${disabled ? 'input-basic__input--read-only' : ''}`}
            />
            {/* {meta.error && meta.touched && <div className="input-basic__required-warning">{meta.error}</div>} */}
        </div>
    );
};

export default FormikInput;
