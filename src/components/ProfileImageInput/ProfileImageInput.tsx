import React from 'react';
import './ProfileImageInput.scss';

type Props = {
    photoUrl: string | null;
    setFieldValue: (field: string, value: any) => void; // Formik's setFieldValue
    fieldName: string; // Field name in the Formik form
};

const ProfileImageInput = ({ photoUrl, setFieldValue, fieldName }: Props) => {
    return (
        <div className={`profile-image-input ${photoUrl ? '' : 'profile-image-input--no-photo'}`}>
            {photoUrl ? (
                <img src={photoUrl} alt="user" className="profile-image-input__image" />
            ) : (
                <i className="profile-image-input__no-photo-icon far fa-user"></i>
            )}

            <label htmlFor="file-upload" className="profile-image-input__label">
                <div className="profile-image-input__image-input-container">
                    <i className="profile-image-input__edit-icon far fa-edit"></i>
                </div>
            </label>

            <input
                onChange={(e) => {
                    if (e.currentTarget.files) {
                        const file = e.currentTarget.files[0];
                        const url = URL.createObjectURL(file);

                        setFieldValue(fieldName, file); // Update Formik state
                    }
                }}
                type="file"
                className="profile-image-input__image-input"
                id="file-upload"
            />
        </div>
    );
};

export default ProfileImageInput;
