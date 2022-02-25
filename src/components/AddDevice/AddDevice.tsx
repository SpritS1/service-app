import React, { useState, useEffect } from 'react';
import './AddDevice.scss';
import SearchBar from 'components/SearchBar/SearchBar';
import { collection, getDocs } from 'firebase/firestore';
import { database } from 'firebase.js';
import DevicesTable from 'components/DevicesTable/DevicesTable';
import IconButton from 'components/IconButton/IconButton';
import SelectButton from 'components/SelectButton/SelectButton';

interface Device {
    model: string;
    category: string;
    serialNumber: string;
    manufacturer: string;
    id: string;
}

const AddDevice = () => {
    const [devices, setDevices] = useState<Device[]>([]);
    // const [model, setModel] = useState('');
    // const [category, setCategory] = useState('');
    // const [serialNumber, setSerialNumber] = useState('');
    // const [manufacturer, setManufacturer] = useState('');

    useEffect(() => {
        const collectionRef = collection(database, 'devices');
        getDocs(collectionRef).then((snapshot) => {
            const devicesArray: any = [];
            snapshot.forEach((doc) => {
                const device = { ...doc.data(), id: doc.id };
                devicesArray.push(device);
            });
            setDevices(devicesArray);
        });
    }, []);

    const tableActions = (
        <>
            <IconButton
                icon={<i className="action-button__icon fas fa-circle-plus" />}
                color={'green'}
            />
            <IconButton
                icon={<i className="action-button__icon fas fa-info-circle" />}
                color={'blue'}
            />
        </>
    );

    return (
        <div className="add-device">
            <h2 className="add-device__title">Add new device</h2>
            <div className="add-device__top">
                <SearchBar />
                <div className="add-device__filters">
                    <SelectButton
                        text={'Category'}
                        options={['Optics', 'Diagnostic', 'Refraction']}
                    />
                    <SelectButton
                        text={'Manufacturer'}
                        options={[
                            'Optivix',
                            'Akagi',
                            'ManuZ',
                            'AmerisourceBergen',
                        ]}
                    />
                </div>
            </div>

            <DevicesTable devices={devices} actions={tableActions} />
            {/* <Button text={'Add device'} /> */}
        </div>
    );
};

export default AddDevice;
