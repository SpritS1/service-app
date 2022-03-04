import React, { useState } from 'react';
import './HeaderDesktop.scss';
import SortBy from 'components/SortBy/SortBy';
import SearchBar from 'components/SearchBar/SearchBar';
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

const HeaderDesktop = ({ userDevices }: Props) => {
    const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);

    return (
        <header className="header-desktop">
            <h5 className="header-desktop__title">Your devices</h5>
            <div className="header-desktop__container-right">
                <SortBy />
                <SearchBar />
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
        </header>
    );
};

export default HeaderDesktop;
