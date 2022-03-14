import React, { useState } from 'react';
import './Header.scss';
import SideBar from 'components/SideBar/SideBar';
import Logo from 'components/Logo/Logo';
interface Props {}

const Header = (props: Props) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <>
            <header className="header">
                <Logo />
                <i
                    className="header__bars fas fa-bars"
                    onClick={() => setIsActive(!isActive)}
                />
            </header>
            <SideBar isActive={isActive} setIsActive={setIsActive} />
        </>
    );
};

export default Header;
