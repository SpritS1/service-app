import React, { useState } from "react";
import "./AddDevice.scss";
import Input from "components/Input/Input";
import Button from "components/Button/Button";

type Props = {};

const AddDevice = (props: Props) => {
  const [model, setModel] = useState("");
  const [category, setCategory] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [manufacturer, setManufacturer] = useState("");

  // const handleModelChange = (e: React.FormEvent<HTMLInputElement>) => {
  //   setModel(e.currentTarget.value);
  // };

  // const handleSerialNumberChange = (e: React.FormEvent<HTMLInputElement>) => {
  //   setSerialNumber(e.currentTarget.value);
  // };

  // const handleCategoryChange = (e: React.FormEvent<HTMLInputElement>) => {
  //   setCategory(e.currentTarget.value);
  // };

  // const handleManufacturerChange = (e: React.FormEvent<HTMLInputElement>) => {
  //   setManufacturer(e.currentTarget.value);
  // };

  return (
    <div className="add-device">
      <h2 className="add-device__title">Add device</h2>
      <Input
        placeholder="Model"
        value={model}
        setState={setModel}
        type="text"
        required
      />
      <Input
        placeholder="Category"
        value={category}
        setState={setCategory}
        type="text"
        required
      />
      <Input
        placeholder="Serial number"
        value={serialNumber}
        setState={setSerialNumber}
        type="text"
        required
      />
      <Input
        placeholder="Manufacturer"
        value={manufacturer}
        setState={setManufacturer}
        type="text"
        required
      />

      <Button text={"Add device"} />
    </div>
  );
};

export default AddDevice;
