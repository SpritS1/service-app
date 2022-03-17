import IconButton from 'components/IconButton/IconButton';
import { DocumentData } from 'firebase/firestore';
import React from 'react';
import './ServiceRequestsTable.scss';

type Props = {
    serviceRequests: DocumentData[];
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
                        <th className="service-requests-table__th">
                            Request category
                        </th>
                        <th className="service-requests-table__th">Status</th>
                        <th className="service-requests-table__th">
                            Created at
                        </th>
                        <th className="service-requests-table__th">
                            Device model
                        </th>
                        <th className="service-requests-table__th">
                            Device serial number
                        </th>
                        <th className="service-requests-table__th">Actions</th>
                    </tr>
                </thead>
                <tbody className="service-requests-table__tbody">
                    {serviceRequests.map(
                        ({ category, status, createdAt, device, id }) => {
                            return (
                                <tr
                                    className="service-requests-table__tr"
                                    key={id}
                                >
                                    <td className="service-requests-table__td">
                                        {category}
                                    </td>
                                    <td
                                        className={`service-requests-table__td ${
                                            (status === 'In progress' &&
                                                'service-requests-table__td--status-in-progress') ||
                                            (status === 'Finished' &&
                                                'service-requests-table__td--status-finished') ||
                                            (status === 'Canceled' &&
                                                'service-requests-table__td--status-canceled')
                                        }`}
                                    >
                                        {status}
                                    </td>
                                    <td className="service-requests-table__td">
                                        {createdAt
                                            .toDate()
                                            .toDateString()
                                            .split(' ')
                                            .slice(1)
                                            .join(' ')}
                                    </td>
                                    <td className="service-requests-table__td">
                                        {device.model}
                                    </td>
                                    <td className="service-requests-table__td">
                                        {device.serialNumber}
                                    </td>
                                    <td className="service-requests-table__td">
                                        <div className="service-requests-table__actions">
                                            {actions.map(
                                                ({
                                                    iconName,
                                                    color,
                                                    callback,
                                                }) => {
                                                    if (
                                                        status === 'Canceled' &&
                                                        iconName ===
                                                            'fas fa-ban'
                                                    )
                                                        return null;

                                                    if (
                                                        status !== 'Canceled' &&
                                                        iconName ===
                                                            'far fa-trash-alt'
                                                    )
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
                                                                    device,
                                                                    id,
                                                                })
                                                            }
                                                            key={`${iconName}-${id}`}
                                                        />
                                                    );
                                                },
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        },
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ServiceRequestsTable;
