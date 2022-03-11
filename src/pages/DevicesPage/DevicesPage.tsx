import React, { useContext, useEffect, useState } from 'react';
import './DevicesPage.scss';
import DeviceTable from 'components/DevicesTable/DevicesTable';
import HeaderDesktop from 'components/HeaderDesktop/HeaderDesktop';
import SortBy from 'components/SortBy/SortBy';
import SearchBar from 'components/SearchBar/SearchBar';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import AddDevice from 'components/AddDevice/AddDevice';
import { database } from 'firebase.js';
import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import useAuth from 'hooks/useAuth';
import Loader from 'components/Loader/Loader';
import Pagination from 'components/Pagination/Pagination';
import usePagination from 'hooks/usePagination';
import SubHeader from 'components/SubHeader/SubHeader';
import { UserDataContext } from 'contexts/UserDataContext';

type Device = {
    model: string;
    category: string;
    serialNumber: string;
    manufacturer: string;
    id: string;
};

const DevicesPage = () => {
    // const [userDevices, setUserDevices] = useState<Device[]>([]);
    const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');
    const [sortBy, setSortBy] = useState<
        'Model' | 'Category' | 'SerialNumber' | 'Manufacturer'
    >('Model');
    const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);

    // const [isFetching, setIsFetching] = useState<boolean>(true);
    const [fetchError, setFetchError] = useState<any>(null);

    const { userData, isFetching, error } = useContext(UserDataContext);
    const { user } = useAuth();

    const {
        setPaginationLimit,
        currentPage,
        setCurrentPage,
        totalPages,
        paginatedElements,
    } = usePagination(filteredDevices, 10);

    const removeDevice = (device: string) => {
        if (user) {
            updateDoc(doc(database, 'users_data', user.uid), {
                devices: arrayRemove(device),
            }).catch((error) => console.error(error));
        }
    };

    // Sorting and filtering devicesArray
    useEffect(() => {
        const filterDevices = (devices: Device[], searchValue: string) => {
            const filteredDevices = devices.filter(
                ({ model, serialNumber }) => {
                    const regex = new RegExp(`^${searchValue}`, 'i');

                    if (
                        searchValue.length !== 0 &&
                        !(regex.test(model) || regex.test(serialNumber))
                    )
                        return false;

                    return true;
                },
            );

            return filteredDevices;
        };

        const sortDevices = (array: Device[]) => {
            const sortedArray = [...array].sort((a: any, b: any) => {
                if (a[sortBy.toLowerCase()] > b[sortBy.toLowerCase()]) return 1;
                if (a[sortBy.toLowerCase()] < b[sortBy.toLowerCase()])
                    return -1;

                return 0;
            });

            return sortedArray;
        };

        if (userData) {
            if (searchValue.length === 0) {
                const sortedDevices = sortDevices(userData.devices);
                setFilteredDevices(sortedDevices);
            } else if (searchValue.length !== 0) {
                const filteredDevices = filterDevices(
                    userData.devices,
                    searchValue,
                );
                const sortedDevices = sortDevices(filteredDevices);
                setFilteredDevices(sortedDevices);
            }
        }
    }, [searchValue, userData, sortBy]);

    // constants
    const ACTIONS: any = [
        { iconName: 'fas fa-wrench', color: 'yellow' },
        { iconName: 'fas fa-info-circle', color: 'blue' },
        { iconName: 'far fa-trash-alt', color: 'red', callback: removeDevice },
    ];

    const SORTING_OPTIONS = [
        'Model',
        'Category',
        'SerialNumber',
        'Manufacturer',
    ];

    return (
        <div className="devices-page">
            <HeaderDesktop title="Your Devices">
                <>
                    <SortBy
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        sortingOptions={SORTING_OPTIONS}
                    />
                    <SearchBar
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                    />
                    <Button
                        text="ADD DEVICE"
                        backgroundColor="blue"
                        action={() => setIsAddDeviceOpen(true)}
                    />
                    {userData && (
                        <Modal
                            isOpen={isAddDeviceOpen}
                            onClose={() => setIsAddDeviceOpen(false)}
                        >
                            <AddDevice
                                setIsAddDeviceOpen={setIsAddDeviceOpen}
                                userDevices={userData.devices}
                            />
                        </Modal>
                    )}
                </>
            </HeaderDesktop>
            <SubHeader>
                <h4 className="devices-page__page-title">Your devices</h4>
                <Button
                    text="ADD DEVICE"
                    backgroundColor="blue"
                    action={() => setIsAddDeviceOpen(true)}
                />
            </SubHeader>
            <SubHeader>
                <SearchBar
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />
                <SortBy
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    sortingOptions={SORTING_OPTIONS}
                />
            </SubHeader>

            <div className="devices-page__main">
                {isFetching && <Loader />}
                {!isFetching && !fetchError && paginatedElements.length !== 0 && (
                    <>
                        <DeviceTable
                            devices={paginatedElements}
                            actions={ACTIONS}
                        />
                        <Pagination
                            setPaginationLimit={setPaginationLimit}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            totalPages={totalPages}
                        />
                    </>
                )}
                {!isFetching && !fetchError && filteredDevices.length === 0 && (
                    <div className="devices-page__fetch-info-container">
                        <h3 className="devices-page__fetch-info">
                            {searchValue.length === 0
                                ? "You don't have any devices"
                                : 'No devices found'}
                        </h3>
                    </div>
                )}
                {!isFetching && fetchError && (
                    <>
                        <h3 className="devices-page__fetch-info">
                            Failed to fetch devices
                        </h3>
                        <p className="devices-page__fetch-error">
                            {fetchError}
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default DevicesPage;
