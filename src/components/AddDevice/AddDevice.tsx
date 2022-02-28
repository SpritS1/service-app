import { useState, useEffect } from 'react';
import './AddDevice.scss';
import SearchBar from 'components/SearchBar/SearchBar';
import {
    collection,
    getDocs,
    getDoc,
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
        const getUserDevices = async () => {
            if (user) {
                const userDataSnapshot = await getDoc(
                    doc(database, 'users_data', user.uid),
                );

                const userData = userDataSnapshot.data();

                if (userData) {
                    const userDevices = userData.devices;
                    return userDevices;
                }
            }
            return null;
        };

        const getAllDevices = async () => {
            const devices: Device[] = [];

            const devicesSnap = await getDocs(collection(database, 'devices'));

            devicesSnap.forEach((doc) => {
                const device = { ...doc.data(), id: doc.id };
                devices.push(device as Device);
            });

            return devices;
        };

        const filterDevices = async () => {
            try {
                const userDevices = await getUserDevices();
                const devices = await getAllDevices();

                const filteredDevices = devices.filter((device) => {
                    for (const userDevice of userDevices) {
                        if (userDevice.id === device.id) return false;
                    }
                    return true;
                });

                setDevices(filteredDevices);
            } catch (error) {
                console.error(error);
            }
        };

        if (user) filterDevices();
    }, [user]);

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
