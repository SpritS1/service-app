import { useState } from 'react';
import './TopSection.scss';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import AddDevice from 'components/AddDevice/AddDevice';

type Device = {
    model: string;
    category: string;
    serialNumber: string;
    manufacturer: string;
    id: string;
};

interface Props {
    userDevices: Device[];
}

const TopSection = ({ userDevices }: Props) => {
    const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);

    return (
        <div className="top-section">
            <h5 className="top-section__title">Your devices</h5>
            <Button
                text="ADD DEVICE"
                backgroundColor="blue"
                action={() => setIsAddDeviceOpen(true)}
            />
            <Modal
                isOpen={isAddDeviceOpen}
                onClose={() => setIsAddDeviceOpen(false)}
            >
                <AddDevice
                    setIsAddDeviceOpen={setIsAddDeviceOpen}
                    userDevices={userDevices}
                />
            </Modal>
        </div>
    );
};

export default TopSection;
