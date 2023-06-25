import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import './AddDevice.scss';
import SearchBar from 'components/SearchBar/SearchBar';
import { collection, getDocs, doc, arrayUnion, updateDoc, query, orderBy } from 'firebase/firestore';
import { database } from 'firebase.js';
import DevicesTable from 'components/DevicesTable/DevicesTable';
import SelectButton from 'components/SelectButton/SelectButton';
import useAuth from 'hooks/useAuth';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import usePagination from 'hooks/usePagination';
import Pagination from 'components/Pagination/Pagination';
import useKeyPress from 'hooks/useKeyPress';
import useFetch from 'hooks/useFetch';

interface Props {
    setIsAddDeviceOpen: (arg: boolean) => void;
    userDevices: Device[];
}

const AddDevice = ({ setIsAddDeviceOpen, userDevices }: Props) => {
    //new code
    const { data: devices, loading, error, refetch } = useFetch<Device[]>('http://localhost:8000/devices');

    // Set to filter the devices array
    const [filterCategoryValue, setFilterCategoryValue] = useState<string | null>(null);
    const [filterManufacturerValue, setFilterManufacturerValue] = useState<string | null>(null);
    const [searchValue, setSearchValue] = useState<string>('');
    // Unique values to be displayed in SelectButtons
    const [categories, setCategories] = useState<string[]>([]);
    const [manufacturers, setManufacturers] = useState<string[]>([]);

    // const {
    //     setPaginationLimit,
    //     currentPage,
    //     setCurrentPage,
    //     totalPages,
    //     paginatedElements: paginatedDevices,
    // } = usePagination(filteredDevices);

    useKeyPress({ onEscape: () => setIsAddDeviceOpen(false) });

    const ACTIONS: any[] = [
        { iconName: 'fas fa-circle-plus', color: 'green', callback: () => null },
        { iconName: 'fas fa-info-circle', color: 'blue', callback: () => null },
    ];

    return (
        <div className="add-device">
            <div className="add-device__top">
                <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
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

            <div className="add-device__bottom">
                {loading && <Loader />}
                {!loading && !error && devices && devices.length > 0 && (
                    <DevicesTable devices={devices} actionButtons={ACTIONS} />
                )}
                {!loading && error && (
                    <>
                        <h3 className="add-device__fetch-info">Failed to fetch devices</h3>
                        <p className="add-device__fetch-error">{error}</p>
                        <Button text={'TRY AGAIN'} backgroundColor="blue" action={() => refetch()} />
                    </>
                )}
                {!loading && !error && devices?.length === 0 && (
                    <>
                        <h3 className="add-device__fetch-info">No devices found</h3>
                    </>
                )}
            </div>

            {/* {devices?.length !== 0 && (
                <div className="add-device__bottom">
                    <DevicesTable devices={devices} actionButtons={ACTIONS} />
                    <Pagination
                        setPaginationLimit={setPaginationLimit}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                    /> 
                </div>
            )} */}
        </div>
    );
};

export default AddDevice;
