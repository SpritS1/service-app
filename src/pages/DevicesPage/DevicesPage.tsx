import React, { useEffect, useState } from 'react';
import './DevicesPage.scss';
import TopSection from 'components/TopSection/TopSection';
import FilterSection from 'components/FilterSection/FilterSection';
import DeviceTable from 'components/DevicesTable/DevicesTable';
import Header from 'components/Header/Header';
import HeaderDesktop from 'components/HeaderDesktop/HeaderDesktop';
import { database } from 'firebase.js';
import {
    arrayRemove,
    doc,
    DocumentReference,
    onSnapshot,
    updateDoc,
} from 'firebase/firestore';
import useAuth from 'hooks/useAuth';
import Loader from 'components/Loader/Loader';

type Device = {
    model: string;
    category: string;
    serialNumber: string;
    manufacturer: string;
    id: string;
};

const DevicesPage = () => {
    const [userDevices, setUserDevices] = useState<Device[]>([]);
    const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [fetchError, setFetchError] = useState<any | null>(null);
    const [searchValue, setSearchValue] = useState<string>('');
    const { user } = useAuth();

    useEffect(() => {
        try {
            if (user) {
                const docRef: DocumentReference = doc(
                    database,
                    'users_data',
                    user.uid,
                );
                onSnapshot(docRef, (doc) => {
                    const docSnap = doc.data();
                    if (docSnap) setUserDevices(docSnap.devices);
                    setIsFetching(false);
                });
            }
        } catch (error) {
            setFetchError(error);
            setIsFetching(false);
        }
    }, [user]);

    const removeDevice = (device: string) => {
        if (user) {
            updateDoc(doc(database, 'users_data', user.uid), {
                devices: arrayRemove(device),
            }).catch((error) => console.error(error));
        }
    };

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

            setFilteredDevices(filteredDevices);
        };

        if (searchValue.length === 0) setFilteredDevices(userDevices);
        else filterDevices(userDevices, searchValue);
    }, [searchValue, userDevices]);

    const actions: any = [
        { iconName: 'fas fa-wrench', color: 'yellow' },
        { iconName: 'fas fa-info-circle', color: 'blue' },
        { iconName: 'far fa-trash-alt', color: 'red', callback: removeDevice },
    ];

    return (
        <div className="devices-page">
            <Header />
            <HeaderDesktop
                userDevices={userDevices}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            />
            <TopSection userDevices={userDevices} />
            <FilterSection
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            />
            <div className="devices-page__main">
                {isFetching && <Loader />}
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
                {!isFetching && !fetchError && filteredDevices.length !== 0 && (
                    <DeviceTable devices={filteredDevices} actions={actions} />
                )}
            </div>
        </div>
    );
};

export default DevicesPage;
