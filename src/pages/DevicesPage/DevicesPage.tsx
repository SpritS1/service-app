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

interface Device {
    model: string;
    category: string;
    serialNumber: string;
    manufacturer: string;
    id: string;
}

const DevicesPage = () => {
    const [devices, setDevices] = useState<Device[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [fetchError, setFetchError] = useState<any | null>(null);
    const { user } = useAuth();

    useEffect(() => {
        try {
            if (user) {
                const docRef: DocumentReference = doc(
                    database,
                    'users_data',
                    user.uid,
                );
                // throw 'XD';
                onSnapshot(docRef, (doc) => {
                    const docSnap = doc.data();
                    if (docSnap) setDevices(docSnap.devices);
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

    const actions: any = [
        { iconName: 'fas fa-wrench', color: 'yellow' },
        { iconName: 'fas fa-info-circle', color: 'blue' },
        { iconName: 'far fa-trash-alt', color: 'red', callback: removeDevice },
    ];

    return (
        <div className="devices-page">
            <Header />
            <HeaderDesktop />
            <TopSection />
            <FilterSection />
            <div className="devices-page__main">
                {isFetching && <Loader />}
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
                {!isFetching && !fetchError && (
                    <DeviceTable devices={devices} actions={actions} />
                )}
            </div>
        </div>
    );
};

export default DevicesPage;
