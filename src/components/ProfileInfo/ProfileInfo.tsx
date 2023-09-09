import Button from 'components/Button/Button';
import Popup from 'components/Popup/Popup';
import ProfileImageInput from 'components/ProfileImageInput/ProfileImageInput';
import usePopup from 'hooks/usePopup';
import React from 'react';
import './ProfileInfo.scss';
import { User } from 'models/User';
import { ErrorMessage, Field, FieldProps, Form, Formik, FormikErrors, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import FormikInput from 'components/FormikInput/FormikInput';
import { useAuth } from 'contexts/NewAuthContext';
import { ApiResponse } from 'models/Api';

interface Props {
    userData: User | null;
}

interface ProfileInfoFormValues {
    firstName: string;
    lastName: string;
    email: string | null;
    phone: string;
    city: string;
    postCode: string;
    companyName: string;
    photoUrl: string | null;
    photoFile: File | null;
}

const ProfileInfo = ({ userData }: Props) => {
    const { setUser } = useAuth();

    const initialValues: ProfileInfoFormValues = {
        firstName: userData?.firstName || '',
        lastName: userData?.lastName || '',
        email: userData?.email || '',
        phone: userData?.phone || '',
        city: userData?.city || '',
        postCode: userData?.postCode || '',
        companyName: userData?.companyName || '',
        photoUrl: userData?.photoUrl || null,
        photoFile: null,
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('Name is required'),
        lastName: Yup.string().required('Surname is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        phone: Yup.string().required('Phone is required'),
        city: Yup.string().required('City is required'),
        postCode: Yup.string().required('Post Code is required'),
        companyName: Yup.string().required('Company name is required'),
    });

    const { popupContent, setPopupContent, popupType, setPopupType, isPopupActive, setIsPopupActive, resetPopup } =
        usePopup();

    const handleSubmit = async (
        values: ProfileInfoFormValues,
        { setSubmitting }: FormikHelpers<ProfileInfoFormValues>,
    ) => {
        setSubmitting(true);

        try {
            const response = await fetch('http://localhost:8000/profile', {
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
                credentials: 'include',
                method: 'PUT',
            });
            const data: ApiResponse<User> = await response.json();
            if (data.success && data.data) {
                setUser(data.data);
                setPopupContent('Profile updated successfully');
                setPopupType('default');
                setIsPopupActive(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="profile-info">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting, setFieldValue }) => (
                    <Form>
                        <div className="profile-info__top">
                            <h3 className="profile-info__title">USER DETAILS</h3>
                            <div className="profile-info__image-container">
                                <ProfileImageInput
                                    photoUrl={initialValues.photoUrl}
                                    setFieldValue={setFieldValue}
                                    fieldName="photoFile"
                                />
                            </div>
                        </div>
                        <Field name="firstName" type="text" placeholder="Name" component={FormikInput} />
                        <Field name="lastName" type="text" placeholder="Surname" component={FormikInput} />
                        <Field name="email" type="email" placeholder="Email" component={FormikInput} />
                        <Field name="phone" type="tel" placeholder="Phone" component={FormikInput} />
                        <Field name="city" type="text" placeholder="City" component={FormikInput} />
                        <Field name="postCode" type="text" placeholder="Post Code" component={FormikInput} />
                        <Field name="companyName" type="text" placeholder="Company Name" component={FormikInput} />

                        <div className="profile-info__button-container">
                            <Button
                                text="Update profile"
                                backgroundColor="blue"
                                type="submit"
                                disabled={isSubmitting}
                            />
                        </div>
                    </Form>
                )}
            </Formik>

            <Popup
                content={popupContent}
                duration={5000}
                type={popupType}
                isActive={isPopupActive}
                setIsActive={setIsPopupActive}
            />
        </div>
    );
};

export default ProfileInfo;
