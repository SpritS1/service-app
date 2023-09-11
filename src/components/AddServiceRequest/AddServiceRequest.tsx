import Button from 'components/Button/Button';
import InputBasic from 'components/InputBasic/InputBasic';
import SelectButton from 'components/SelectButton/SelectButton';
import TextAreaInput from 'components/TextAreaInput/TextAreaInput';
import useKeyPress from 'hooks/useKeyPress';
import React, { useEffect, useState } from 'react';
import './AddServiceRequest.scss';
import { useAuth } from 'contexts/NewAuthContext';

interface Props {
    setIsServiceRequestOpen: (value: boolean) => void;
    device: Device;
    popup: any;
}

const ServiceRequets = ({ setIsServiceRequestOpen, device, popup }: Props) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [problemDescription, setProblemDescription] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const { user } = useAuth();

    useKeyPress({
        onEscape: () => {
            setIsServiceRequestOpen(false);
        },
    });

    useEffect(() => {
        if (selectedCategory) setIsButtonDisabled(false);
    }, [selectedCategory]);

    const SERVICE_CATEGORIES: string[] = ['Damaged device', 'Software update', 'Inspection and maintenance', 'Other'];

    const handleSendRequest = async () => {
        const serviceRequest = {
            deviceId: device._id,
            category: selectedCategory,
            problemDescription: problemDescription,
            status: 'In progress',
        };

        console.log(serviceRequest);

        try {
            const response = await fetch('http://localhost:8000/service-request', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(serviceRequest),
            });

            const result = await response.json();

            if (result.success) {
                setIsServiceRequestOpen(false);
                popup.setPopupContent('Request sent successfully');
                popup.setPopupType('default');
                popup.setIsPopupActive(true);
            } else {
                popup.setPopupContent(result.error || 'An error occurred');
                popup.setPopupType('error');
                popup.setIsPopupActive(true);
            }
        } catch (error) {
            popup.setPopupContent(error as string);
            popup.setPopupType('error');
            popup.setIsPopupActive(true);
        }
    };

    return (
        <div className="add-service-request">
            <InputBasic
                type="text"
                placeholder="Manufacturer"
                disabled
                value={device.manufacturer}
                setState={() => null}
            />

            <InputBasic type="text" placeholder="Model" disabled value={device.model} setState={() => null} />

            <InputBasic
                type="text"
                placeholder="Serial number"
                disabled
                value={device.serialNumber}
                setState={() => null}
            />

            <SelectButton
                text="Problem category"
                options={SERVICE_CATEGORIES}
                selectedOption={selectedCategory}
                setSelectedOption={setSelectedCategory}
            />

            <TextAreaInput label="Describe problem" value={problemDescription} onChange={setProblemDescription} />

            <Button text="Send request" action={handleSendRequest} disabled={isButtonDisabled} backgroundColor="blue" />
        </div>
    );
};

export default ServiceRequets;
