import React from 'react';
import './ProfileImageInput.scss';

type Props = {
    photoUrl: string | null;
    setPhotoUrl?: (photo: string) => void;
    photoFile: File | null;
    setPhotoFile: (value: File) => void;
};

const ProfileImageInput = ({
    photoUrl,
    setPhotoUrl,
    photoFile,
    setPhotoFile,
}: Props) => {
    return (
        <div className="profile-image-input">
            {photoUrl ? (
                <img
                    src={photoUrl}
                    alt="user"
                    className="profile-image-input__image"
                />
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

                        setPhotoFile(file);
                        setPhotoUrl!(url);
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
