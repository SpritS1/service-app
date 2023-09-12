import React, { useEffect, useState } from 'react';
import HeaderDesktop from 'components/HeaderDesktop/HeaderDesktop';
import ServiceRequestsTable from 'components/ServiceRequestsTable/ServiceRequestsTable';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import ConfirmModal from 'components/ConfirmModal/ConfirmModal';
import ModalWindow from 'components/ModalWindow/ModalWindow';
import ServiceRequestInfo from 'components/ServiceRequestInfo/ServiceRequestInfo';
import SubHeader from 'components/SubHeader/SubHeader';
import SearchBar from 'components/SearchBar/SearchBar';
import { ApiResponse } from 'models/Api';
import IServiceRequest from 'models/ServiceRequest';

interface Props {}

const ServiceRequestManagement = (props: Props) => {
    const getServiceRequests = async () => {
        const res = await fetch('http://localhost:8000/service-request', { credentials: 'include' });
        const data: ApiResponse<IServiceRequest[]> = await res.json();

        if (data.success && data.data) {
            setServiceRequests(data.data);
        }
    };

    useEffect(() => {
        getServiceRequests();
        setIsFetching(false);
    }, []);
    const [serviceRequests, setServiceRequests] = useState<IServiceRequest[]>([]);

    const [isFetching, setIsFetching] = useState(true);
    const [fetchError, setFetchError] = useState<any>(null);
    const [actionRequest, setActionRequest] = useState<IServiceRequest | null>(null);

    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [isRequestInfoOpen, setIsRequestInfoOpen] = useState(false);

    const [searchValue, setSearchValue] = useState('');

    const removeRequest = async (request: IServiceRequest) => {
        try {
            const res = await fetch(`http://localhost:8000/service-request/${request._id}`, {
                credentials: 'include',
                method: 'DELETE',
            });

            const data: ApiResponse = await res.json();

            if (data.success) {
                setServiceRequests((prevState) =>
                    prevState.filter((serviceRequest) => serviceRequest._id !== request._id),
                );
            }
        } catch (err) {
            console.error(err);
        }
    };

    const cancelRequest = async (request: IServiceRequest) => {
        try {
            const res = await fetch(`http://localhost:8000/service-request/${request._id}/cancel`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'Canceled' }),
            });

            const data: ApiResponse<IServiceRequest> = await res.json();

            if (data.success && data.data) {
                const updatedServiceRequests = serviceRequests.map((serviceRequest) => {
                    if (serviceRequest._id === data.data?._id) {
                        return data.data;
                    }
                    return serviceRequest;
                });
                setServiceRequests(updatedServiceRequests);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const ACTIONS: any[] = [
        {
            iconName: 'fas fa-info-circle',
            color: 'blue',
            callback: (request: IServiceRequest) => {
                console.log(`Request info: ${JSON.stringify(request)}`);
                setActionRequest(request);
                setIsRequestInfoOpen(true);
            },
        },
        {
            iconName: 'far fa-trash-alt',
            color: 'red',
            callback: (request: IServiceRequest) => {
                setActionRequest(request);
                setIsDeleteConfirmOpen(true);
            },
        },
        {
            iconName: 'fas fa-ban',
            color: 'red',
            callback: (request: IServiceRequest) => {
                setActionRequest(request);
                setIsDeleteConfirmOpen(true);
            },
        },
    ];

    return (
        <div className="service-requests-page">
            <HeaderDesktop title="Your Service Requests">
                <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} placeholder={'Find request...'} />
            </HeaderDesktop>
            <SubHeader>
                <h4 className="service-requests-page__title">Your service requests</h4>
            </SubHeader>
            <SubHeader>
                <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} placeholder={'Find request...'} />
            </SubHeader>
            <main className="service-requests-page__main">
                {isFetching && <Loader />}
                {!isFetching && !fetchError && serviceRequests.length !== 0 && (
                    <ServiceRequestsTable serviceRequests={serviceRequests} actions={ACTIONS} />
                )}
                {!isFetching && !fetchError && serviceRequests.length === 0 && (
                    <div className="service-requests-page__fetch-info-container">
                        <h3 className="service-requests-page__fetch-info">{'You have no service requests'}</h3>
                    </div>
                )}
                {!isFetching && fetchError && (
                    <>
                        <h3 className="service-requests-page__fetch-info">Failed to fetch service requests</h3>
                        <p className="service-requests-page__fetch-error">{fetchError}</p>
                    </>
                )}
            </main>

            {actionRequest && setIsRequestInfoOpen && (
                <Modal isOpen={isRequestInfoOpen} onClose={() => setIsRequestInfoOpen(false)}>
                    <ModalWindow title={'Service request'} onClose={() => setIsRequestInfoOpen(false)}>
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
                        text="Are you sure to cancel this service request?"
                        callback={() => cancelRequest(actionRequest)}
                        closeModal={() => {
                            setActionRequest(null);
                            setIsDeleteConfirmOpen(false);
                        }}
                    />
                </Modal>
            )}

            {actionRequest && (actionRequest.status === 'Finished' || actionRequest.status === 'Canceled') && (
                <Modal
                    isOpen={isDeleteConfirmOpen}
                    onClose={() => {
                        setActionRequest(null);
                        setIsDeleteConfirmOpen(false);
                    }}
                >
                    <ConfirmModal
                        title="Delete service request"
                        text="Are you sure to delete this service request permanently?"
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

export default ServiceRequestManagement;
