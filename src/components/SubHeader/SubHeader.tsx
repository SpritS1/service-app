import React from 'react';
import './SubHeader.scss';

interface Props {
    children?: React.ReactNode;
}

const SubHeader = ({ children }: Props) => {
    return <div className="sub-header">{children}</div>;
};

export default SubHeader;
