import React, { useEffect, useState } from 'react';
import './ServiceRequestsPage.scss';
import HeaderDesktop from 'components/HeaderDesktop/HeaderDesktop';
import ServiceRequestsTable from 'components/ServiceRequestsTable/ServiceRequestsTable';
import { database } from 'firebase.js';
import {
    collection,
    deleteDoc,
    doc,
    DocumentData,
    onSnapshot,
    orderBy,
    query,
    Timestamp,
    updateDoc,
    where,
} from 'firebase/firestore';
import useAuth from 'hooks/useAuth';
import Pagination from 'components/Pagination/Pagination';
import usePagination from 'hooks/usePagination';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import ConfirmModal from 'components/ConfirmModal/ConfirmModal';
import ModalWindow from 'components/ModalWindow/ModalWindow';
import ServiceRequestInfo from 'components/ServiceRequestInfo/ServiceRequestInfo';

interface Device {
    model: string;
    category: string;
    serialNumber: string;
    manufacturer: string;
    id: string;
}

interface Request {
    id: string;
    category: string;
    createdAt: Timestamp;
    device: Device;
    problemDescription: string;
    status: 'Canceled' | 'In progress' | 'Finished';
    userId: string;
}

interface Props {}

const ServiceRequestsPage = (props: Props) => {
    const [serviceRequests, setServiceRequests] = useState<DocumentData[]>([]);
    const [isFetching, setIsFetching] = useState(true);
    const [fetchError, setFetchError] = useState<any>(null);
    const [actionRequest, setActionRequest] = useState<Request | null>(null);

    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [isRequestInfoOpen, setIsRequestInfoOpen] = useState(false);

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
            if (user) {
                onSnapshot(
                    query(
                        collection(database, 'serviceRequests'),
                        where('userId', '==', user.uid),
                        orderBy('createdAt', 'desc'),
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
            }
        } catch (error) {
            setFetchError(error);
            setIsFetching(false);
        }
    }, [user]);

    const removeRequest = async (request: Request) => {
        if (user) {
            try {
                await deleteDoc(doc(database, 'serviceRequests', request.id));
            } catch (error) {
                console.error(error);
            }
        }
    };

    const cancelRequest = async (request: Request) => {
        if (user) {
            try {
                await updateDoc(doc(database, 'serviceRequests', request.id), {
                    status: 'Canceled',
                });
            } catch (error) {
                console.error(error);
            }
        }
    };

    const ACTIONS: any[] = [
        {
            iconName: 'fas fa-info-circle',
            color: 'blue',
            callback: (request: Request) => {
                setActionRequest(request);
                setIsRequestInfoOpen(true);
            },
        },
        {
            iconName: 'far fa-trash-alt',
            color: 'red',
            callback: (request: Request) => {
                setActionRequest(request);
                setIsDeleteConfirmOpen(true);
            },
        },
        {
            iconName: 'fas fa-ban',
            color: 'red',
            callback: (request: Request) => {
                setActionRequest(request);
                setIsDeleteConfirmOpen(true);
            },
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

            {actionRequest && setIsRequestInfoOpen && (
                <Modal
                    isOpen={isRequestInfoOpen}
                    onClose={() => setIsRequestInfoOpen(false)}
                >
                    <ModalWindow
                        title={'Service request'}
                        onClose={() => setIsRequestInfoOpen(false)}
                    >
                        <ServiceRequestInfo request={actionRequest} />
                    </ModalWindow>
                </Modal>
            )}

            {actionRequest && actionRequest.status === 'In progress' && (
                <Modal
                    isOpen={isDeleteConfirmOpen}
                    onClose={() => {
                        setActionRequest(null);
                        setIsDeleteConfirmOpen(false);
                    }}
                >
                    <ConfirmModal
                        title="Cancel service request"
                        text="Are you sure to cancel this service?"
                        callback={() => cancelRequest(actionRequest)}
                        closeModal={() => {
                            setActionRequest(null);
                            setIsDeleteConfirmOpen(false);
                        }}
                    />
                </Modal>
            )}

            {actionRequest &&
                (actionRequest.status === 'Finished' ||
                    actionRequest.status === 'Canceled') && (
                    <Modal
                        isOpen={isDeleteConfirmOpen}
                        onClose={() => {
                            setActionRequest(null);
                            setIsDeleteConfirmOpen(false);
                        }}
                    >
                        <ConfirmModal
                            title="Delete service request"
                            text="Are you sure to delete this service permanently?"
                            callback={() => removeRequest(actionRequest)}
                            closeModal={() => {
                                setActionRequest(null);
                                setIsDeleteConfirmOpen(false);
                            }}
                        />
                    </Modal>
                )}
        </div>
    );
};

export default ServiceRequestsPage;
