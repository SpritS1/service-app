import React, { useEffect, useState } from 'react';
import './DevicesPage.scss';
import TopSection from 'components/TopSection/TopSection';
import FilterSection from 'components/FilterSection/FilterSection';
import DeviceTable from 'components/DevicesTable/DevicesTable';
import Header from 'components/Header/Header';
import HeaderDesktop from 'components/HeaderDesktop/HeaderDesktop';
import IconButton from 'components/IconButton/IconButton';
import { database } from 'firebase.js';
import {
    arrayRemove,
    doc,
    DocumentReference,
    getDoc,
    onSnapshot,
    updateDoc,
} from 'firebase/firestore';
import useAuth from 'hooks/useAuth';

interface Props {}

const DevicesPage = (props: Props) => {
    const [devices, setDevices] = useState([]);
    const { user } = useAuth();

    // useEffect(() => {
    //     if (user) {
    //         const docRef: DocumentReference = doc(
    //             database,
    //             'users_data',
    //             user.uid,
    //         );
    //         getDoc(docRef).then((doc) => {
    //             const docSnap = doc.data();
    //             if (docSnap) setDevices(docSnap.devices);
    //         });
    //     }
    // }, [user]);

    useEffect(() => {
        if (user) {
            const docRef: DocumentReference = doc(
                database,
                'users_data',
                user.uid,
            );
            onSnapshot(docRef, (doc) => {
                const docSnap = doc.data();
                if (docSnap) setDevices(docSnap.devices);
            });
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
                <DeviceTable devices={devices} actions={actions} />
            </div>
        </div>
    );
};

export default DevicesPage;
