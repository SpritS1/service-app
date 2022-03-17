import React, { useEffect, useState } from 'react';
import './ServiceRequestsPage.scss';
import HeaderDesktop from 'components/HeaderDesktop/HeaderDesktop';
import ServiceRequestsTable from 'components/ServiceRequestsTable/ServiceRequestsTable';
import { database } from 'firebase.js';
import {
    collection,
    DocumentData,
    onSnapshot,
    query,
    where,
} from 'firebase/firestore';
import useAuth from 'hooks/useAuth';
import Pagination from 'components/Pagination/Pagination';
import usePagination from 'hooks/usePagination';

interface Props {}

const ServiceRequestsPage = (props: Props) => {
    const [serviceRequests, setServiceRequests] = useState<DocumentData[]>([]);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState<any>(null);

    const { user } = useAuth();

    const {
        setPaginationLimit,
        currentPage,
        setCurrentPage,
        totalPages,
        paginatedElements,
    } = usePagination(serviceRequests, 10);

    useEffect(() => {
        try {
            setIsFetching(true);
            if (user)
                onSnapshot(
                    query(
                        collection(database, 'serviceRequests'),
                        where('userId', '==', user.uid),
                    ),
                    (snap) => {
                        const serviceRequests: any[] = [];

                        for (const doc of snap.docs) {
                            serviceRequests.push({ ...doc.data(), id: doc.id });
                        }

                        if (serviceRequests)
                            setServiceRequests(serviceRequests);
                        if (!serviceRequests) setServiceRequests([]);

                        setIsFetching(false);
                    },
                );
        } catch (error) {
            setError(error);
        }
    }, [user]);

    const ACTIONS: any[] = [
        {
            iconName: 'fas fa-pen',
            color: 'yellow',
        },
        { iconName: 'fas fa-info-circle', color: 'blue' },
        {
            iconName: 'far fa-trash-alt',
            color: 'red',
        },
    ];

    return (
        <div className="service-requests-page">
            <HeaderDesktop title="Your Service Requests" />
            <div className="service-requests-page__main">
                {serviceRequests && (
                    <>
                        <ServiceRequestsTable
                            serviceRequests={paginatedElements}
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
            </div>
        </div>
    );
};

export default ServiceRequestsPage;
