import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import Button from 'components/Button/Button';
import FormikInput from 'components/FormikInput/FormikInput';
import { ApiResponse } from 'models/Api';
import useKeyPress from 'hooks/useKeyPress';
import './AdminAddDevice.scss';

interface Props {
    onClose: () => void;
    setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
}

interface FormValues {
    model: string;
    category: string;
    serialNumber: string;
    manufacturer: string;
}

const initialValues: FormValues = {
    model: '',
    category: '',
    serialNumber: '',
    manufacturer: '',
};

const validationSchema = Yup.object().shape({
    model: Yup.string().required('Model is required'),
    category: Yup.string().required('Category is required'),
    serialNumber: Yup.string().required('Serial Number is required'),
    manufacturer: Yup.string().required('Manufacturer is required'),
});

const AdminAddDevice = ({ onClose, setDevices }: Props) => {
    useKeyPress({ onEscape: onClose });

    const handleSubmit = async (values: FormValues) => {
        try {
            const response = await fetch('http://localhost:8000/devices', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const result: ApiResponse<Device> = await response.json();

            if (result.success && result.data) {
                setDevices((prevState) => [...prevState, result.data!]);
                console.log('Device added successfully:', result);
            } else {
                console.log('Failed to add device:', result);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        } finally {
            onClose();
        }
    };

    return (
        <div className="add-device">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                    <Form className="admin-add-device__form">
                        <Field name="model" type="text" placeholder="Model" component={FormikInput} />
                        <Field name="category" type="text" placeholder="Category" component={FormikInput} />
                        <Field name="serialNumber" type="text" placeholder="Serial Number" component={FormikInput} />
                        <Field name="manufacturer" type="text" placeholder="Manufacturer" component={FormikInput} />

                        <div className="admin-add-device__button-container">
                            <Button text="Add Device" backgroundColor="blue" type="submit" disabled={isSubmitting} />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AdminAddDevice;
