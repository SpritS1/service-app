import { useState, useEffect, useCallback } from 'react';
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
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';

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
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [fetchError, setFetchError] = useState<any | null>(null);
    const { user } = useAuth();

    const fetchDevices = useCallback(async () => {
        const getUserDevices = async () => {
            const userDataSnapshot = await getDoc(
                doc(database, 'users_data', user!.uid),
            );

            const userData = userDataSnapshot.data();

            if (userData) {
                const userDevices = userData.devices;
                return userDevices;
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

        const filterDevices = async (
            userDevices: Device[],
            devices: Device[],
        ) => {
            const filteredDevices = devices.filter((device) => {
                for (const userDevice of userDevices) {
                    if (userDevice.id === device.id) return false;
                }
                return true;
            });

            return filteredDevices;
        };

        try {
            setIsFetching(true);
            setFetchError(null);
            const userDevices = await getUserDevices();
            const devices = await getAllDevices();
            const filteredDevices = await filterDevices(userDevices, devices);

            if (filteredDevices) setDevices(filteredDevices);
            setIsFetching(false);
        } catch (error) {
            setFetchError(error);
            setIsFetching(false);
        }
    }, [user]);

    useEffect(() => {
        if (user) fetchDevices();
    }, [user, fetchDevices]);

    const addDevice = (device: string) => {
        if (user) {
            updateDoc(doc(database, 'users_data', user.uid), {
                devices: arrayUnion(device),
            }).catch((error) => console.error(error));

            setIsAddDeviceOpen(false);
        }
    };

    const actions: {
        iconName: string;
        color: 'blue' | 'red' | 'yellow' | 'green';
        callback: (...args: any[]) => void;
    }[] = [
        { iconName: 'fas fa-circle-plus', color: 'green', callback: addDevice },
        { iconName: 'fas fa-info-circle', color: 'blue', callback: () => null },
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
            {devices.length === 0 && (
                <div className="add-device__bottom">
                    {isFetching && <Loader />}
                    {!isFetching && !fetchError && devices.length === 0 && (
                        <>
                            <h3 className="add-device__fetch-info">
                                No devices aviable
                            </h3>
                            <Button
                                text={'TRY AGAIN'}
                                backgroundColor="blue"
                                action={() => fetchDevices()}
                            />
                        </>
                    )}
                    {!isFetching && fetchError && (
                        <>
                            <h3 className="add-device__fetch-info">
                                Failed to fetch devices
                            </h3>
                            <p className="add-device__fetch-error">
                                {fetchError}
                            </p>
                            <Button
                                text={'TRY AGAIN'}
                                backgroundColor="blue"
                                action={() => fetchDevices()}
                            />
                        </>
                    )}
                </div>
            )}

            {devices.length !== 0 && (
                <DevicesTable devices={devices} actions={actions} />
            )}
        </div>
    );
};

export default AddDevice;
