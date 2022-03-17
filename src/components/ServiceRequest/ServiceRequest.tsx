import Button from 'components/Button/Button';
import SelectButton from 'components/SelectButton/SelectButton';
import { database } from 'firebase.js';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import useAuth from 'hooks/useAuth';
import React, { useEffect, useState } from 'react';
import './ServiceRequest.scss';

interface Device {
    model: string;
    category: string;
    serialNumber: string;
    manufacturer: string;
    id: string;
}

interface Props {
    setIsServiceRequestOpen: (value: boolean) => void;
    device: Device;
    popup: any;
}

const ServiceRequets = ({ setIsServiceRequestOpen, device, popup }: Props) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null,
    );
    const [problemDescription, setProblemDescription] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const { user } = useAuth();

    useEffect(() => {
        if (selectedCategory) setIsButtonDisabled(false);
    }, [selectedCategory]);

    const SERVICE_CATEGORIES: string[] = [
        'Damaged device',
        'Software update',
        'Inspection and maintenance',
        'Other',
    ];

    const handleSendRequest = async () => {
        const serviceRequest = {
            userId: user?.uid,
            device: device,
            category: selectedCategory,
            problemDescription: problemDescription,
            status: 'In progress',
            createdAt: serverTimestamp(),
        };

        try {
            await addDoc(
                collection(database, 'serviceRequests'),
                serviceRequest,
            );

            setIsServiceRequestOpen(false);

            popup.setPopupContent('Request sent succesfuly');
            popup.setPopupType('default');
            popup.setIsPopupActive(true);
        } catch (error) {
            popup.setPopupContent(error as string);
            popup.setPopupType('error');
            popup.setIsPopupActive(true);
        }
    };

    return (
        <div className="service-request">
            <div className="service-request__input-container">
                <label htmlFor="" className="service-request__label">
                    Manufacturer
                </label>
                <input
                    type="text"
                    className="service-request__input"
                    disabled
                    value={device.manufacturer}
                />
            </div>

            <div className="service-request__input-container">
                <label htmlFor="" className="service-request__label">
                    Model
                </label>
                <input
                    type="text"
                    className="service-request__input"
                    disabled
                    value={device.model}
                />
            </div>

            <div className="service-request__input-container">
                <label htmlFor="" className="service-request__label">
                    Serial number
                </label>
                <input
                    type="text"
                    className="service-request__input"
                    disabled
                    value={device.serialNumber}
                />
            </div>

            <SelectButton
                text="Problem category"
                options={SERVICE_CATEGORIES}
                selectedOption={selectedCategory}
                setSelectedOption={setSelectedCategory}
            />

            <div className="service-request__input-container">
                <label htmlFor="" className="service-request__label">
                    Describe problem
                </label>
                <textarea
                    className="service-request__textarea"
                    value={problemDescription}
                    onChange={(e) => setProblemDescription(e.target.value)}
                ></textarea>
            </div>

            <Button
                text="Send request"
                action={handleSendRequest}
                disabled={isButtonDisabled}
                backgroundColor="blue"
            />
        </div>
    );
};

export default ServiceRequets;
