import React from 'react';
import { useState, useEffect } from 'react';
import './AddDevice.scss';
import SearchBar from 'components/SearchBar/SearchBar';
import DevicesTable from 'components/DevicesTable/DevicesTable';
import SelectButton from 'components/SelectButton/SelectButton';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';

import useKeyPress from 'hooks/useKeyPress';
import useFetch from 'hooks/useFetch';
import { ApiResponse } from 'models/Api';

interface Props {
    setIsAddDeviceOpen: (arg: boolean) => void;
    userDevices: Device[];
    setUserDevices: (arg: Device[]) => void;
}

const AddDevice = ({ setIsAddDeviceOpen, userDevices, setUserDevices }: Props) => {
    //new code
    const { data, loading, error, refetch } = useFetch<ApiResponse<Device[]>>('http://localhost:8000/devices');
    const [notAddedDevices, setNotAddedDevices] = useState<Device[]>([]);
    // Set to filter the devices array
    const [filterCategoryValue, setFilterCategoryValue] = useState<string | null>(null);
    const [filterManufacturerValue, setFilterManufacturerValue] = useState<string | null>(null);
    const [searchValue, setSearchValue] = useState<string>('');
    // Unique values to be displayed in SelectButtons
    const [categories, setCategories] = useState<string[]>([]);
    const [manufacturers, setManufacturers] = useState<string[]>([]);

    useKeyPress({ onEscape: () => setIsAddDeviceOpen(false) });

    useEffect(() => {
        console.log(data);
        if (!data?.data) return;
        console.log('Devices:', data?.data);
        console.log('User Devices:', userDevices);

        const filteredDevices = data?.data.filter(
            (device) => !userDevices.some((userDevice) => userDevice._id === device._id),
        );

        setNotAddedDevices(filteredDevices);
    }, [data, userDevices]);

    const handleAddDevice = async (device: Device) => {
        try {
            const body = {
                deviceId: device._id,
            };
            const response = await fetch('http://localhost:8000/profile/devices', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            const result: ApiResponse = await response.json();

            if (result.success) {
                setUserDevices([...userDevices, device]);
                console.log('Device added successfully:', result);
            } else {
                console.log('Failed to add device:', result);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const ACTIONS: any[] = [
        { iconName: 'fas fa-circle-plus', color: 'green', callback: handleAddDevice },
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
                {!loading && !error && data?.data && data?.data.length > 0 && (
                    <DevicesTable devices={notAddedDevices} actionButtons={ACTIONS} />
                )}
                {!loading && error && (
                    <>
                        <h3 className="add-device__fetch-info">Failed to fetch devices</h3>
                        <p className="add-device__fetch-error">{error}</p>
                        <Button text={'TRY AGAIN'} backgroundColor="blue" action={() => refetch()} />
                    </>
                )}
                {!loading && !error && data?.data?.length === 0 && (
                    <>
                        <h3 className="add-device__fetch-info">No devices found</h3>
                    </>
                )}
            </div>
        </div>
    );
};

export default AddDevice;
