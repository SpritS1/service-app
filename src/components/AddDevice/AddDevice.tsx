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
import usePagination from 'hooks/usePagination';
import Pagination from 'components/Pagination/Pagination';

interface Device {
    model: string;
    category: string;
    serialNumber: string;
    manufacturer: string;
    id: string;
}

interface Props {
    setIsAddDeviceOpen: (arg: boolean) => void;
    userDevices: Device[];
}

const AddDevice = ({ setIsAddDeviceOpen, userDevices }: Props) => {
    const [notOwnedDevices, setNotOwnedDevices] = useState<Device[]>([]);
    const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);
    // Fetch
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [fetchError, setFetchError] = useState<any | null>(null);
    // Set to filter the devices array
    const [filterCategoryValue, setFilterCategoryValue] = useState<
        string | null
    >(null);
    const [filterManufacturerValue, setFilterManufacturerValue] = useState<
        string | null
    >(null);
    const [searchValue, setSearchValue] = useState<string>('');
    // Unique values to be displayed in SelectButtons
    const [categories, setCategories] = useState<string[]>([]);
    const [manufacturers, setManufacturers] = useState<string[]>([]);

    const { user } = useAuth();

    const {
        setPaginationLimit,
        currentPage,
        setCurrentPage,
        totalPages,
        paginatedElements: paginatedDevices,
    } = usePagination(filteredDevices);

    useEffect(() => {
        const manufQuery = query(
            collection(database, 'manufacturers'),
            orderBy('name', 'asc'),
        );

        getDocs(manufQuery)
            .then((snap) => {
                const manufacturers: string[] = [];
                for (const doc of snap.docs) {
                    manufacturers.push(doc.data().name);
                }
                setManufacturers(manufacturers);
            })
            .catch((error) => setManufacturers([]));

        const categoryQuery = query(
            collection(database, 'deviceCategories'),
            orderBy('name', 'asc'),
        );

        getDocs(categoryQuery)
            .then((snap) => {
                const categories: string[] = [];
                for (const doc of snap.docs) {
                    categories.push(doc.data().name);
                }
                setCategories(categories);
            })
            .catch((error) => setCategories([]));
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

        const removeOwnedDevices = async (
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
            const filteredDevices = await removeOwnedDevices(
                userDevices,
                devices,
            );

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
        const filterDevices = (devices: Device[], searchValue: string) => {
            const filteredDevices = devices.filter(
                ({ category, model, manufacturer, serialNumber }) => {
                    const regex = new RegExp(`^${searchValue}`, 'i');

                    if (filterCategoryValue && category !== filterCategoryValue)
                        return false;

                    if (
                        filterManufacturerValue &&
                        manufacturer !== filterManufacturerValue
                    )
                        return false;

                    if (
                        searchValue.length !== 0 &&
                        !(regex.test(model) || regex.test(serialNumber))
                    )
                        return false;

                    return true;
                },
            );

            setFilteredDevices(filteredDevices);
        };

        if (
            !filterCategoryValue &&
            !filterManufacturerValue &&
            searchValue.length === 0
        )
            setFilteredDevices(notOwnedDevices);
        else filterDevices(notOwnedDevices, searchValue);
    }, [
        notOwnedDevices,
        filterCategoryValue,
        filterManufacturerValue,
        searchValue,
    ]);

    const addDevice = (device: Device) => {
        if (user && device) {
            updateDoc(doc(database, 'users_data', user.uid), {
                devices: arrayUnion(device),
            }).catch((error) => console.error(error));

            setIsAddDeviceOpen(false);
        }
    };

    const ACTIONS: any[] = [
        { iconName: 'fas fa-circle-plus', color: 'green', callback: addDevice },
        { iconName: 'fas fa-info-circle', color: 'blue', callback: () => null },
    ];

    return (
        <div className="add-device">
            <div className="add-device__top">
                <SearchBar
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />
                <div className="add-device__filters">
                    <SelectButton
                        text={'Category'}
                        options={categories}
                        selectedOption={filterCategoryValue}
                        setSelectedOption={setFilterCategoryValue}
                        resetText="All"
                    />
                    <SelectButton
                        text={'Manufacturer'}
                        options={manufacturers}
                        selectedOption={filterManufacturerValue}
                        setSelectedOption={setFilterManufacturerValue}
                        resetText="All"
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
                <div className="add-device__bottom">
                    <DevicesTable
                        devices={paginatedDevices}
                        actionButtons={ACTIONS}
                    />
                    <Pagination
                        setPaginationLimit={setPaginationLimit}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                    />
                </div>
            )}
        </div>
    );
};

export default AddDevice;
