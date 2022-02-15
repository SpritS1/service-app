import React from "react";
import IconButton from "./IconButton/IconButton";
import "./TableItem.scss";

type Props = {
  device: {
    model: string;
    category: string;
    serialNumber: string;
    manufacturer: string;
  };
};

const TableItem = ({ device }: Props) => {
  return (
    <tr className="table-item">
      <td>{device.model}</td>
      <td>{device.category}</td>
      <td>{device.serialNumber}</td>
      <td>{device.manufacturer}</td>
      <td>
        <IconButton
          icon={<i className="action-button__icon fas fa-wrench" />}
        />
        <IconButton
          icon={<i className="action-button__icon fas fa-info-circle" />}
        />
        <IconButton
          icon={<i className="action-button__icon far fa-trash-alt" />}
        />
      </td>
    </tr>
  );
};

export default TableItem;
