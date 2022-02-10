import React from "react";
import TableItem from "./TableItem/TableItem";
import "./DevicesTable.scss";

interface Props {
  devices: any;
}

const DevicesTable = ({ devices }: Props) => {
  return (
    <div className="devices-table">
      <table>
        <thead>
          <tr>
            <th>Model</th>
            <th>Category</th>
            <th>Serial number</th>
            <th>Manufacturer</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {devices.map(
            (device: {
              model: string;
              category: string;
              serialNumber: string;
              manufacturer: string;
              id: string;
            }) => {
              return <TableItem device={device} key={device.id} />;
            }
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DevicesTable;
