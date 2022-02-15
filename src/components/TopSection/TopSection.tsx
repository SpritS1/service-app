import { useEffect, useState } from "react";
import "./TopSection.scss";
import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";
import AddDevice from "components/AddDevice/AddDevice";

interface Props {}

const TopSection = (props: Props) => {
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);

  return (
    <div className="top-section">
      <h5 className="top-section__title">Your devices</h5>
      <Button
        text="ADD DEVICE"
        backgroundColor="blue"
        action={() => setIsAddDeviceOpen(true)}
      />
      <Modal isOpen={isAddDeviceOpen} onClose={() => setIsAddDeviceOpen(false)}>
        <AddDevice />
      </Modal>
    </div>
  );
};

export default TopSection;
