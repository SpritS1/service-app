import React from 'react';
import './HeaderDesktop.scss';

interface Props {
    children?: JSX.Element;
    title: string;
}

const HeaderDesktop = ({ children, title }: Props) => {
    return (
        <header className="header-desktop">
            <h5 className="header-desktop__title">{title}</h5>
            <div className="header-desktop__container-right">{children}</div>
        </header>
    );
};

export default HeaderDesktop;
