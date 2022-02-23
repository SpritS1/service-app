import React from 'react';
// import IconButton from './IconButton/IconButton';
import './TableItem.scss';

type Props = {
    device: {
        model: string;
        category: string;
        serialNumber: string;
        manufacturer: string;
    };
    actions: JSX.Element;
};

const TableItem = ({ device, actions }: Props) => {
    return (
        <tr className="table-item">
            <td>{device.model}</td>
            <td>{device.category}</td>
            <td>{device.serialNumber}</td>
            <td>{device.manufacturer}</td>
            <td>{actions}</td>
        </tr>
    );
};

export default TableItem;
