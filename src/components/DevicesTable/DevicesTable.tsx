import './DevicesTable.scss';

interface Props {
    devices: Device[];
    actions: JSX.Element;
}

interface Device {
    model: string;
    category: string;
    serialNumber: string;
    manufacturer: string;
    id: string;
}
const DevicesTable = ({ devices, actions }: Props) => {
    return (
        <div className="devices-table">
            <table className="devices-table__table">
                <thead className="devices-table__thead">
                    <tr className="devices-table__thead-tr">
                        <th className="devices-table__th">Model</th>
                        <th className="devices-table__th">Category</th>
                        <th className="devices-table__th">Serial number</th>
                        <th className="devices-table__th">Manufacturer</th>
                        <th className="devices-table__th">Actions</th>
                    </tr>
                </thead>
                <tbody className="devices-table__tbody">
                    {devices.map(
                        ({
                            model,
                            category,
                            serialNumber,
                            manufacturer,
                            id,
                        }: Device) => {
                            return (
                                <tr className="devices-table__tr" key={id}>
                                    <td className="devices-table__td">
                                        {model}
                                    </td>
                                    <td className="devices-table__td">
                                        {category}
                                    </td>
                                    <td className="devices-table__td">
                                        {serialNumber}
                                    </td>
                                    <td className="devices-table__td">
                                        {manufacturer}
                                    </td>
                                    <td className="devices-table__td">
                                        {actions}
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

export default DevicesTable;
