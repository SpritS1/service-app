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
    query,
    orderBy,
} from 'firebase/firestore';
import { database } from 'firebase.js';
import DevicesTable from 'components/DevicesTable/DevicesTable';
import SelectButton from 'components/SelectButton/SelectButton';
import useAuth from 'hooks/useAuth';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';

type Device = {
    model: string;
    category: string;
    serialNumber: string;
    manufacturer: string;
    id: string;
};

interface Props {
    setIsAddDeviceOpen: (arg: boolean) => void;
    userDevices: Device[];
}

const AddDevice = ({ setIsAddDeviceOpen, userDevices }: Props) => {
    const [devices, setDevices] = useState<Device[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [fetchError, setFetchError] = useState<any | null>(null);
    // Set to filter the devices array
    const [filterCategory, setFilterCategory] = useState<string | null>(null);
    const [filterManufacturer, setFilterManufacturer] = useState<string | null>(
        null,
    );
    // Unique values to be displayed in SelectButtons
    const [categories, setCategories] = useState<string[]>([]);
    const [manufacturers, setManufacturers] = useState<string[]>([]);

    const { user } = useAuth();

    useEffect(() => {
        const manufQuery = query(
            collection(database, 'manufacturers'),
            orderBy('name', 'asc'),
        );

        getDocs(manufQuery).then((snap) => {
            const manufacturers: string[] = [];
            for (const doc of snap.docs) {
                manufacturers.push(doc.data().name);
            }
            setManufacturers(manufacturers);
        });

        const categoryQuery = query(
            collection(database, 'deviceCategories'),
            orderBy('name', 'asc'),
        );

        getDocs(categoryQuery).then((snap) => {
            const categories: string[] = [];
            for (const doc of snap.docs) {
                categories.push(doc.data().name);
            }
            setCategories(categories);
        });
    }, []);

    const fetchDevices = useCallback(async () => {
        const getAllDevices = async () => {
            const devices: Device[] = [];

            let devicesQuery = query(
                collection(database, 'devices'),
                orderBy('model'),
            );

            const devicesSnap = await getDocs(devicesQuery);

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

            const devices = await getAllDevices();
            const filteredDevices = await filterDevices(userDevices, devices);

            if (filteredDevices) setDevices(filteredDevices);

            setIsFetching(false);
        } catch (error) {
            setFetchError(error);
            setIsFetching(false);
        }
    }, [userDevices]);

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
                        options={categories}
                        selectedOption={filterCategory}
                        setSelectedOption={setFilterCategory}
                    />
                    <SelectButton
                        text={'Manufacturer'}
                        options={manufacturers}
                        selectedOption={filterManufacturer}
                        setSelectedOption={setFilterManufacturer}
                    />
                </div>
            </div>
            {devices.length === 0 && (
                <div className="add-device__bottom">
                    {isFetching && <Loader />}
                    {!isFetching && !fetchError && devices.length === 0 && (
                        <>
                            <h3 className="add-device__fetch-info">
                                No devices found
                            </h3>
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
