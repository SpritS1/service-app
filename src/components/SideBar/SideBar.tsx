import { Link, useLocation, useNavigate } from 'react-router-dom';
import Account from './Account/Account';
import Logo from 'components/Logo/Logo';
import './SideBar.scss';
import useAuth from 'hooks/useAuth';
import React, { useEffect, useRef } from 'react';

interface Props {
    isActive: boolean;
    setIsActive: (value: boolean) => void;
}

const SideBar = ({ isActive, setIsActive }: Props) => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const location = useLocation();

    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                isActive &&
                sidebarRef.current &&
                !sidebarRef.current.contains(e.target as Node)
            )
                setIsActive(false);
        };
        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [setIsActive, isActive]);

    return (
        <div ref={sidebarRef} className={`sidebar ${isActive && 'active'}`}>
            <div className="sidebar__logo-container">
                <Logo />
            </div>
            <Account />
            <nav className="sidebar__nav">
                <Link
                    to="/"
                    className={`sidebar__nav-link ${
                        location.pathname === '/' ? 'active' : ''
                    }`}
                >
                    <i className="sidebar__nav-icon fa-solid fa-microchip"></i>
                    Devices
                </Link>
                <Link
                    to="/service-requests"
                    className={`sidebar__nav-link ${
                        location.pathname === '/service-requests'
                            ? 'active'
                            : ''
                    }`}
                >
                    <i className="sidebar__nav-icon fa-solid fa-wrench"></i>
                    Service requests
                </Link>
                <Link
                    to="/contact"
                    className={`sidebar__nav-link ${
                        location.pathname === '/contact' ? 'active' : ''
                    }`}
                >
                    <i className="sidebar__nav-icon fa-solid fa-address-book"></i>
                    Contact
                </Link>
                <Link
                    to="/profile"
                    className={`sidebar__nav-link ${
                        location.pathname === '/profile' ? 'active' : ''
                    }`}
                >
                    <i className="sidebar__nav-icon fa-solid fa-user"></i>
                    Profile
                </Link>
                <div
                    className="sidebar__nav-link"
                    onClick={() => logout(() => navigate('/auth/login'))}
                >
                    <i className="sidebar__nav-icon fas fa-power-off" />
                    Logout
                </div>
            </nav>
        </div>
    );
};

export default SideBar;
