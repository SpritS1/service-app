import { useState, useEffect } from 'react';
import './AddDevice.scss';
import SearchBar from 'components/SearchBar/SearchBar';
import {
    collection,
    getDocs,
    doc,
    arrayUnion,
    updateDoc,
} from 'firebase/firestore';
import { database } from 'firebase.js';
import DevicesTable from 'components/DevicesTable/DevicesTable';
import SelectButton from 'components/SelectButton/SelectButton';
import useAuth from 'hooks/useAuth';

interface Device {
    model: string;
    category: string;
    serialNumber: string;
    manufacturer: string;
    id: string;
}

const AddDevice = ({
    setIsAddDeviceOpen,
}: {
    setIsAddDeviceOpen: (arg: boolean) => void;
}) => {
    const [devices, setDevices] = useState<Device[]>([]);
    const { user } = useAuth();

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

    const addDevice = (device: string) => {
        if (user) {
            updateDoc(doc(database, 'users_data', user.uid), {
                devices: arrayUnion(device),
            }).catch((error) => console.error(error));
            setIsAddDeviceOpen(false);
        }
    };

    const actions: any = [
        { iconName: 'fas fa-circle-plus', color: 'green', callback: addDevice },
        { iconName: 'fas fa-info-circle', color: 'blue' },
    ];

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
                        options={['Optivix', 'Akagi', 'Arctic']}
                    />
                </div>
            </div>

            <DevicesTable devices={devices} actions={actions} />
        </div>
    );
};

export default AddDevice;
