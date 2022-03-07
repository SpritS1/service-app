import Header from 'components/Header/Header';
import React from 'react';

type Props = { children: JSX.Element };

const Layout = ({ children }: Props) => {
    return (
        <div className="layout">
            <Header />
            <main className="layout__main">{children}</main>
        </div>
    );
};

export default Layout;
