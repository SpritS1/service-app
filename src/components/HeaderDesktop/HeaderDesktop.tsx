import React from 'react';
import './HeaderDesktop.scss';

interface Props {
    headerContent: JSX.Element;
}

const HeaderDesktop = ({ headerContent }: Props) => {
    return (
        <header className="header-desktop">
            <h5 className="header-desktop__title">Your devices</h5>
            <div className="header-desktop__container-right">
                {headerContent}
            </div>
        </header>
    );
};

export default HeaderDesktop;
