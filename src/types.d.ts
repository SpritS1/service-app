interface Device {
    model: string;
    category: string;
    serialNumber: string;
    manufacturer: string;
    _id: string;
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
