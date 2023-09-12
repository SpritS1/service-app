import React, { useContext, useEffect, useState } from 'react';
import './DevicesPage.scss';
import DevicesTable from 'components/DevicesTable/DevicesTable';
import HeaderDesktop from 'components/HeaderDesktop/HeaderDesktop';
import SortBy from 'components/SortBy/SortBy';
import SearchBar from 'components/SearchBar/SearchBar';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import AddDevice from 'components/AddDevice/AddDevice';
import { database } from 'firebase.js';
import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import Loader from 'components/Loader/Loader';
import Pagination from 'components/Pagination/Pagination';
import usePagination from 'hooks/usePagination';
import SubHeader from 'components/SubHeader/SubHeader';
import AddServiceRequets from 'components/AddServiceRequest/AddServiceRequest';
import ModalWindow from 'components/ModalWindow/ModalWindow';
import Popup from 'components/Popup/Popup';
import usePopup from 'hooks/usePopup';
import ConfirmModal from 'components/ConfirmModal/ConfirmModal';
import { ApiResponse } from 'models/Api';

const DevicesPage = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [sortBy, setSortBy] = useState<'Model' | 'Category' | 'SerialNumber' | 'Manufacturer'>('Model');
    const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);
    const [isServiceRequestOpen, setIsServiceRequestOpen] = useState(false);
    const [serviceRequestDevice, setServiceRequestDevice] = useState<Device | null>(null);
    const [fetchError, setFetchError] = useState<any>(null);
    const [actionDevice, setActionDevice] = useState<Device | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userDevices, setUserDevices] = useState<Device[]>([]);

    // const { user } = useAuth();
    const popup = usePopup();
    // const { setPaginationLimit, currentPage, setCurrentPage, totalPages, paginatedElements } = usePagination(
    //     filteredDevices,
    //     10,
    // );

    const getDevices = async () => {
        const res = await fetch('http://localhost:8000/profile/devices', { credentials: 'include' });
        const data: ApiResponse<Device[]> = await res.json();
        if (data.success && data.data) {
            setUserDevices(data.data);
        }
    };

    useEffect(() => {
        getDevices();
        setIsLoading(false);
    }, []);

    const removeDevice = async () => {
        try {
            if (actionDevice === null) return;

            const body = {
                deviceId: actionDevice._id,
            };
            const response = await fetch('http://localhost:8000/profile/devices', {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            const result: ApiResponse = await response.json();

            if (result.success) {
                setUserDevices(userDevices.filter((item) => item._id !== actionDevice._id));
                console.log('Device removed successfully:', result);
            } else {
                console.log('Failed to remove device:', result);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const handleServiceClick = (device: Device) => {
        setServiceRequestDevice(device);
        setIsServiceRequestOpen(true);
    };

    const ACTIONS: any[] = [
        {
            iconName: 'fas fa-wrench',
            color: 'yellow',
            callback: handleServiceClick,
        },
        {
            iconName: 'fas fa-info-circle',
            color: 'blue',
            callback: () =>
                window.open(
                    'https://www.felder-group.com/pl-pl/produkty/centra-obrobcze-cnc-c1953/cnc-wiertarsko-kolkujace-d-jet-p583668',
                    '_blank',
                ),
        },
        {
            iconName: 'far fa-trash-alt',
            color: 'red',
            callback: (device: Device) => {
                setActionDevice(device);
            },
        },
    ];

    const SORTING_OPTIONS = ['Model', 'Category', 'SerialNumber', 'Manufacturer'];

    return (
        <div className="devices-page">
            <HeaderDesktop title="Your Devices">
                <>
                    <SortBy sortBy={sortBy} setSortBy={setSortBy} sortingOptions={SORTING_OPTIONS} />
                    <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} placeholder="Find device..." />
                    <Button text="ADD DEVICE" backgroundColor="blue" action={() => setIsAddDeviceOpen(true)} />
                </>
            </HeaderDesktop>
            <SubHeader>
                <h4 className="devices-page__page-title">Your devices</h4>
                <Button text="ADD DEVICE" backgroundColor="blue" action={() => setIsAddDeviceOpen(true)} />
            </SubHeader>
            <SubHeader>
                <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} placeholder="Find device..." />
                <SortBy sortBy={sortBy} setSortBy={setSortBy} sortingOptions={SORTING_OPTIONS} />
            </SubHeader>

            <div className="devices-page__main">
                {isLoading && <Loader />}
                {!isLoading && <DevicesTable devices={userDevices} actionButtons={ACTIONS} />}
                {!isLoading && !fetchError && userDevices.length === 0 && (
                    <div className="devices-page__fetch-info-container">
                        <h3 className="devices-page__fetch-info">
                            {searchValue.length === 0 ? "You don't have any devices" : 'No devices found'}
                        </h3>
                    </div>
                )}
                {!isLoading && fetchError && (
                    <>
                        <h3 className="devices-page__fetch-info">Failed to fetch devices</h3>
                        <p className="devices-page__fetch-error">{fetchError}</p>
                    </>
                )}

                <>
                    <Modal isOpen={isAddDeviceOpen} onClose={() => setIsAddDeviceOpen(false)}>
                        <ModalWindow title="Add new device" onClose={() => setIsAddDeviceOpen(false)}>
                            <AddDevice
                                setIsAddDeviceOpen={setIsAddDeviceOpen}
                                userDevices={userDevices}
                                setUserDevices={setUserDevices}
                            />
                        </ModalWindow>
                    </Modal>
                    {serviceRequestDevice && (
                        <Modal isOpen={isServiceRequestOpen} onClose={() => setIsServiceRequestOpen(false)}>
                            <ModalWindow title="New service request" onClose={() => setIsServiceRequestOpen(false)}>
                                <AddServiceRequets
                                    device={serviceRequestDevice}
                                    setIsServiceRequestOpen={() => setIsServiceRequestOpen(false)}
                                    popup={popup}
                                />
                            </ModalWindow>
                        </Modal>
                    )}
                </>
            </div>

            {actionDevice && (
                <Modal isOpen={actionDevice !== null} onClose={() => setActionDevice(null)}>
                    <ConfirmModal
                        title="Device delete"
                        text="Are you sure to delete this device?"
                        callback={removeDevice}
                        closeModal={() => setActionDevice(null)}
                    />
                </Modal>
            )}

            <Popup
                content={popup.popupContent}
                duration={3000}
                type={popup.popupType}
                isActive={popup.isPopupActive}
                setIsActive={popup.setIsPopupActive}
            />
        </div>
    );
};

export default DevicesPage;
