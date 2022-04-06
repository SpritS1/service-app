import InputBasic from 'components/InputBasic/InputBasic';
import { Timestamp } from 'firebase/firestore';
import React from 'react';
import './ServiceRequestInfo.scss';

interface Request {
    id: string;
    category: string;
    createdAt: Timestamp;
    device: Device;
    problemDescription: string;
    status: 'Canceled' | 'In progress' | 'Finished';
    userId: string;
}

type Props = { request: Request };

const ServiceRequestInfo = ({ request }: Props) => {
    return (
        <div className="service-request-info">
            <div className="service-request-info__request-info">
                <h4 className="service-request-info__section-title">
                    Request details
                </h4>
                <InputBasic
                    type="text"
                    placeholder="Created at"
                    disabled
                    value={request.createdAt
                        .toDate()
                        .toDateString()
                        .split(' ')
                        .slice(1)
                        .join(' ')}
                    setState={() => null}
                />

                <InputBasic
                    type="text"
                    placeholder="Status"
                    disabled
                    value={request.status}
                    setState={() => null}
                />

                <InputBasic
                    type="text"
                    placeholder="Problem category"
                    disabled
                    value={request.category}
                    setState={() => null}
                />

                {request.problemDescription && (
                    <div className="service-request-info__problem-description-container">
                        <label className="service-request-info__problem-description-label">
                            Problem description
                        </label>
                        <div className="service-request-info__problem-description">
                            {request.problemDescription}
                        </div>
                    </div>
                )}
            </div>

            <div className="service-request-info__device-info">
                <h4 className="service-request-info__section-title">
                    Device details
                </h4>
                <InputBasic
                    type="text"
                    placeholder="Manufacturer"
                    disabled
                    value={request.device.manufacturer}
                    setState={() => null}
                />

                <InputBasic
                    type="text"
                    placeholder="Model"
                    disabled
                    value={request.device.model}
                    setState={() => null}
                />

                <InputBasic
                    type="text"
                    placeholder="Serial number"
                    disabled
                    value={request.device.serialNumber}
                    setState={() => null}
                />

                <InputBasic
                    type="text"
                    placeholder="Device category"
                    disabled
                    value={request.device.category}
                    setState={() => null}
                />
            </div>
        </div>
    );
};

export default ServiceRequestInfo;
