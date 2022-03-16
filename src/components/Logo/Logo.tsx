import React from 'react';
import './Logo.scss';
import { Link } from 'react-router-dom';

interface Props {}

const Logo = (props: Props) => {
    return (
        <Link to="/" className="logo">
            Service <div className="logo__color">X</div>
        </Link>
    );
};

export default Logo;
