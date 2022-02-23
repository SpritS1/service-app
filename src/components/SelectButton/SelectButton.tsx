import React from 'react';
import './SelectButton.scss';

type Props = {
    text: string;
};

const SelectButton = ({ text }: Props) => {
    return <button className="select-button">{text}</button>;
};

export default SelectButton;
