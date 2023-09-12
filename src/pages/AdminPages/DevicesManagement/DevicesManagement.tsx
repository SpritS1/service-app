import Button from 'components/Button/Button';
import AdminAddDevice from 'components/DevicesTable/AdminAddDevice';
import DevicesTable from 'components/DevicesTable/DevicesTable';
import HeaderDesktop from 'components/HeaderDesktop/HeaderDesktop';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import ModalWindow from 'components/ModalWindow/ModalWindow';
import SubHeader from 'components/SubHeader/SubHeader';
import { ApiResponse } from 'models/Api';
import React, { useEffect, useState } from 'react';

type Props = {};

const DevicesManagement = (props: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [devices, setDevices] = useState<Device[]>([]);

    const getDevices = async () => {
        const res = await fetch('http://localhost:8000/devices', { credentials: 'include' });
        const data: ApiResponse<Device[]> = await res.json();
        console.log(data);
        if (data.success && data.data) {
            setDevices(data.data);
        }
    };

    useEffect(() => {
        getDevices();
        setIsLoading(false);
    }, []);

    const deleteDevice = async (device: Device) => {
        try {
            const response = await fetch(`http://localhost:8000/devices/${device._id}`, {
                credentials: 'include',
                method: 'DELETE',
            });

            const data: ApiResponse<Device> = await response.json();
            if (data.success) setDevices((prevState) => prevState.filter((device) => device._id !== data.data?._id));
        } catch (error) {
            console.error(error);
        }
    };

    const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);

    const ACTIONS: any[] = [
        {
            iconName: 'far fa-trash-alt',
            color: 'red',
            callback: (device: Device) => {
                deleteDevice(device);
            },
        },
    ];

    return (
        <>
            <div className="devices-page">
                <HeaderDesktop title="Your Devices">
                    <Button text="ADD DEVICE" backgroundColor="blue" action={() => setIsAddDeviceOpen(true)} />
                </HeaderDesktop>
                <SubHeader>
                    <h4 className="devices-page__page-title">Devices management</h4>
                    <Button text="ADD DEVICE" backgroundColor="blue" action={() => setIsAddDeviceOpen(true)} />
                </SubHeader>

                <div className="devices-page__main">
                    {isLoading && <Loader />}
                    {!isLoading && <DevicesTable devices={devices} actionButtons={ACTIONS} />}
                </div>
            </div>

            <Modal isOpen={isAddDeviceOpen} onClose={() => setIsAddDeviceOpen(false)}>
                <ModalWindow title="Add new device" onClose={() => setIsAddDeviceOpen(false)}>
                    <AdminAddDevice onClose={() => setIsAddDeviceOpen(false)} setDevices={setDevices} />
                </ModalWindow>
            </Modal>
        </>
    );
};

export default DevicesManagement;
