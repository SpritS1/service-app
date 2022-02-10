import React, { useState } from "react";
import "./AddDevice.scss";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import { database } from "firebase";

type Props = {};

const AddDevice = (props: Props) => {
  const [model, setModel] = useState("");
  const [category, setCategory] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [manufacturer, setManufacturer] = useState("");

  const handleModelChange = (e: any) => {
    setModel(e.target.value);
  };

  const handleSerialNumberChange = (e: any) => {
    setSerialNumber(e.target.value);
  };

  const handleCategoryChange = (e: any) => {
    setCategory(e.target.value);
  };

  const handleManufacturerChange = (e: any) => {
    setManufacturer(e.target.value);
  };

  return (
    <div className="add-device">
      <h2 className="add-device__title">Add device</h2>
      <Input
        placeholder="Model"
        value={model}
        onChange={handleModelChange}
        type="text"
        required
      />
      <Input
        placeholder="Category"
        value={category}
        onChange={handleCategoryChange}
        type="text"
        required
      />
      <Input
        placeholder="Serial number"
        value={serialNumber}
        onChange={handleSerialNumberChange}
        type="text"
        required
      />
      <Input
        placeholder="Manufacturer"
        value={manufacturer}
        onChange={handleManufacturerChange}
        type="text"
        required
      />

      <Button text={"Add device"} />
    </div>
  );
};

export default AddDevice;
