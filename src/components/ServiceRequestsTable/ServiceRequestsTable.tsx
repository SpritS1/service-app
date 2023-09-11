import IconButton from 'components/IconButton/IconButton';
import React from 'react';
import './ServiceRequestsTable.scss';
import IServiceRequest from 'models/ServiceRequest';

type Props = {
    serviceRequests: IServiceRequest[];
    actions: {
        iconName: string;
        color: 'blue' | 'red' | 'yellow' | 'green';
        callback: (...args: any[]) => void;
    }[];
};

const ServiceRequestsTable = ({ serviceRequests, actions }: Props) => {
    return (
        <div className="service-requests-table">
            <table className="service-requests-table__table">
                <thead className="service-requests-table__thead">
                    <tr className="service-requests-table__thead-tr">
                        <th className="service-requests-table__th">Request category</th>
                        <th className="service-requests-table__th">Status</th>
                        <th className="service-requests-table__th">Created at</th>
                        {/* <th className="service-requests-table__th">Device model</th>
                        <th className="service-requests-table__th">Device serial number</th> */}
                        <th className="service-requests-table__th">Actions</th>
                    </tr>
                </thead>
                <tbody className="service-requests-table__tbody">
                    {serviceRequests.map(({ category, status, createdAt, problemDescription, deviceId, _id }) => {
                        return (
                            <tr className="service-requests-table__tr" key={_id}>
                                <td className="service-requests-table__td">{category}</td>
                                <td
                                    className={`service-requests-table__td ${
                                        (status === 'In progress' &&
                                            'service-requests-table__td--status-in-progress') ||
                                        (status === 'Finished' && 'service-requests-table__td--status-finished') ||
                                        (status === 'Canceled' && 'service-requests-table__td--status-canceled')
                                    }`}
                                >
                                    {status}
                                </td>
                                <td className="service-requests-table__td">{createdAt}</td>
                                {/* <td className="service-requests-table__td">{device.model}</td>
                                <td className="service-requests-table__td">{device.serialNumber}</td> */}
                                <td className="service-requests-table__td">
                                    <div className="service-requests-table__actions">
                                        {actions.map(({ iconName, color, callback }) => {
                                            if (
                                                (status === 'Finished' || status === 'Canceled') &&
                                                iconName === 'fas fa-ban'
                                            )
                                                return null;

                                            if (status === 'In progress' && iconName === 'far fa-trash-alt')
                                                return null;

                                            return (
                                                <IconButton
                                                    iconName={iconName}
                                                    color={color}
                                                    onClick={() =>
                                                        callback({
                                                            category,
                                                            status,
                                                            createdAt,
                                                            problemDescription,
                                                            deviceId,
                                                            _id,
                                                        })
                                                    }
                                                    key={`${iconName}-${_id}`}
                                                />
                                            );
                                        })}
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ServiceRequestsTable;
