export default interface IServiceRequest {
    _id: string;
    category: string;
    createdAt: Date;
    deviceId: string;
    problemDescription: string;
    status: 'Canceled' | 'In progress' | 'Finished';
    userId: string;
}
