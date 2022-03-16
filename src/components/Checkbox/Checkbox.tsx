import React from 'react';
import './Checkbox.scss';

type Props = {
    text: string;
};

const Checkbox = ({ text }: Props) => {
    return (
        <div className="checkbox">
            <input id="checkbox" type="checkbox" className="checkbox__input" />
            <label htmlFor="checkbox" className="checkbox__text">
                {text}
            </label>
        </div>
    );
};

export default Checkbox;
