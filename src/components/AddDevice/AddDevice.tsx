import { useState, useEffect, useCallback } from 'react';
import './AddDevice.scss';
import SearchBar from 'components/SearchBar/SearchBar';
import {
    collection,
    getDocs,
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
    const [notOwnedDevices, setNotOwnedDevices] = useState<Device[]>([]);
    const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [fetchError, setFetchError] = useState<any | null>(null);
    // Set to filter the devices array
    const [filterCategoryValue, setFilterCategoryValue] = useState<
        string | null
    >(null);
    const [filterManufacturerValue, setFilterManufacturerValue] = useState<
        string | null
    >(null);
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

            if (filteredDevices) setNotOwnedDevices(filteredDevices);

            setIsFetching(false);
        } catch (error) {
            setFetchError(error);
            setIsFetching(false);
        }
    }, [userDevices]);

    useEffect(() => {
        if (user) fetchDevices();
    }, [user, fetchDevices]);

    useEffect(() => {
        // const filterDevices = (
        //     fieldName: 'category' | 'manufacturer',
        //     value: string,
        // ) => {
        //     const devices = notOwnedDevices;
        //     console.log(devices);
        // };

        const filterDevices = () => {
            // const devices = notOwnedDevices;
            const filteredDevices = notOwnedDevices.filter((device) => {
                if (
                    filterCategoryValue &&
                    device.category !== filterCategoryValue
                )
                    return false;
                if (
                    filterManufacturerValue &&
                    device.manufacturer !== filterManufacturerValue
                )
                    return false;
                return true;
            });

            setFilteredDevices(filteredDevices);
        };

        if (!filterCategoryValue && !filterManufacturerValue)
            setFilteredDevices(notOwnedDevices);
        else filterDevices();
    }, [notOwnedDevices, filterCategoryValue, filterManufacturerValue]);

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
                        selectedOption={filterCategoryValue}
                        setSelectedOption={setFilterCategoryValue}
                    />
                    <SelectButton
                        text={'Manufacturer'}
                        options={manufacturers}
                        selectedOption={filterManufacturerValue}
                        setSelectedOption={setFilterManufacturerValue}
                    />
                </div>
            </div>
            {filteredDevices.length === 0 && (
                <div className="add-device__bottom">
                    {isFetching && <Loader />}
                    {!isFetching &&
                        !fetchError &&
                        filteredDevices.length === 0 && (
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

            {filteredDevices.length !== 0 && (
                <DevicesTable devices={filteredDevices} actions={actions} />
            )}
        </div>
    );
};

export default AddDevice;
