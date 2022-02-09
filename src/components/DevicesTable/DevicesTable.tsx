import React from "react";
import "./DevicesTable.scss";
import ActionButton from "./IconButton/IconButton";

interface Props {}

const Table = (props: Props) => {
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
          <tr>
            <td>Tais 365</td>
            <td>Refraction</td>
            <td>8C1260BAR</td>
            <td>Akagi</td>
            <td>
              <ActionButton
                icon={<i className="action-button__icon fas fa-wrench" />}
              />
              <ActionButton
                icon={<i className="action-button__icon fas fa-info-circle" />}
              />
              <ActionButton
                icon={<i className="action-button__icon far fa-trash-alt" />}
              />
            </td>
          </tr>
          <tr>
            <td>Tais 365</td>
            <td>Refraction</td>
            <td>8C1260BAR</td>
            <td>Akagi</td>
            <td>
              <ActionButton
                icon={<i className="action-button__icon fas fa-wrench" />}
              />
              <ActionButton
                icon={<i className="action-button__icon fas fa-info-circle" />}
              />
              <ActionButton
                icon={<i className="action-button__icon far fa-trash-alt" />}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
