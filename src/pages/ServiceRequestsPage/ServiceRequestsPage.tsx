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
import Loader from 'components/Loader/Loader';

interface Props {}

const ServiceRequestsPage = (props: Props) => {
    const [serviceRequests, setServiceRequests] = useState<DocumentData[]>([]);
    const [isFetching, setIsFetching] = useState(true);
    const [fetchError, setFetchError] = useState<any>(null);

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
            setFetchError(error);
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
                {isFetching && <Loader />}
                {!isFetching && !fetchError && paginatedElements.length !== 0 && (
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
                {!isFetching && !fetchError && paginatedElements.length === 0 && (
                    <div className="service-requests-page__fetch-info-container">
                        <h3 className="service-requests-page__fetch-info">
                            {'You have no service requests'}
                        </h3>
                    </div>
                )}
                {!isFetching && fetchError && (
                    <>
                        <h3 className="service-requests-page__fetch-info">
                            Failed to fetch devices
                        </h3>
                        <p className="service-requests-page__fetch-error">
                            {fetchError}
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default ServiceRequestsPage;
