import React, { useEffect, useState } from 'react';
import './DevicesPage.scss';
import TopSection from 'components/TopSection/TopSection';
import FilterSection from 'components/FilterSection/FilterSection';
import DeviceTable from 'components/DevicesTable/DevicesTable';
import Header from 'components/Header/Header';
import HeaderDesktop from 'components/HeaderDesktop/HeaderDesktop';
import IconButton from 'components/IconButton/IconButton';
import { database } from 'firebase.js';
import { doc, DocumentReference, getDoc } from 'firebase/firestore';
import useAuth from 'hooks/useAuth';

interface Props {}

const DevicesPage = (props: Props) => {
    const [devices, setDevices] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            const docRef: DocumentReference = doc(
                database,
                'users_data',
                user.uid,
            );
            getDoc(docRef).then((doc) => {
                const docSnap = doc.data();
                if (docSnap) {
                    setDevices(docSnap.devices);
                }
            });
        }
    }, [user]);

    const tempDevices = [
        {
            model: 'Model',
            category: 'Category',
            serialNumber: 'SerialNumber',
            manufacturer: 'Manufacturer',
            id: '1',
        },
    ];

    const tableActions = (
        <>
            <IconButton
                icon={<i className="action-button__icon fas fa-wrench" />}
                color={'yellow'}
            />
            <IconButton
                icon={<i className="action-button__icon fas fa-info-circle" />}
                color={'blue'}
            />
            <IconButton
                icon={<i className="action-button__icon far fa-trash-alt" />}
                color={'red'}
            />
        </>
    );

    return (
        <div className="devices-page">
            <Header />
            <HeaderDesktop />
            <TopSection />
            <FilterSection />
            <DeviceTable devices={tempDevices} actions={tableActions} />
        </div>
    );
};

export default DevicesPage;
