import React from 'react';
import './SecondaryText.scss';

interface Props {
    text: string;
    linkText: string;
    link: string;
}

const SecondaryText = ({ text, linkText, link }: Props) => {
    return (
        <span className="secondary-text">
            {text}{' '}
            <a href={link} className="secondary-text__link">
                {linkText}
            </a>
        </span>
    );
};

export default SecondaryText;
