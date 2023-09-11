import InputBasic from 'components/InputBasic/InputBasic';
import React, { useEffect, useState } from 'react';
import './ServiceRequestInfo.scss';
import IServiceRequest from 'models/ServiceRequest';
import Loader from 'components/Loader/Loader';
import { ApiResponse } from 'models/Api';

type Props = { request: IServiceRequest };

const ServiceRequestInfo = ({ request }: Props) => {
    const [device, setDevice] = useState<Device | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const getDeviceDetails = async () => {
            try {
                setIsLoading(true);

                const res = await fetch(`http://localhost:8000/devices/${request.deviceId}`, {
                    credentials: 'include',
                });
                const data: ApiResponse<Device> = await res.json();

                console.log(data);
                if (data.success && data.data) {
                    setDevice(data.data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        getDeviceDetails();
    }, [request.deviceId]);

    if (isLoading) return <Loader />;

    return (
        <div className="service-request-info">
            <div className="service-request-info__request-info">
                <h4 className="service-request-info__section-title">Request details</h4>
                <InputBasic
                    type="text"
                    placeholder="Created at"
                    disabled
                    value={request.createdAt.toString()}
                    setState={() => null}
                />

                <InputBasic type="text" placeholder="Status" disabled value={request.status} setState={() => null} />

                <InputBasic
                    type="text"
                    placeholder="Problem category"
                    disabled
                    value={request.category}
                    setState={() => null}
                />

                {request.problemDescription && (
                    <div className="service-request-info__problem-description-container">
                        <label className="service-request-info__problem-description-label">Problem description</label>
                        <div className="service-request-info__problem-description">{request.problemDescription}</div>
                    </div>
                )}
            </div>

            <div className="service-request-info__device-info">
                <h4 className="service-request-info__section-title">
                    {device ? 'Device details' : 'Failed to get device details'}
                </h4>
                {device && (
                    <>
                        <InputBasic
                            type="text"
                            placeholder="Manufacturer"
                            disabled
                            value={device.manufacturer}
                            setState={() => null}
                        />
                        <InputBasic
                            type="text"
                            placeholder="Model"
                            disabled
                            value={device.model}
                            setState={() => null}
                        />
                        <InputBasic
                            type="text"
                            placeholder="Serial number"
                            disabled
                            value={device.serialNumber}
                            setState={() => null}
                        />
                        <InputBasic
                            type="text"
                            placeholder="Device category"
                            disabled
                            value={device.category}
                            setState={() => null}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default ServiceRequestInfo;
