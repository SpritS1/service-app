import React from 'react';
import './UserImage.scss';

type Props = {
    isEditable?: boolean;
    photoUrl: string | null;
    setPhotoUrl?: (photo: string) => void;
};

const UserImage = ({ isEditable = false, photoUrl, setPhotoUrl }: Props) => {
    return (
        <div className="user-image">
            {photoUrl ? (
                <img src={photoUrl} alt="user" className="user-image__image" />
            ) : (
                <i className="user-image__no-photo-icon far fa-user"></i>
            )}

            {isEditable && (
                <>
                    <label htmlFor="file-upload" className="user-image__label">
                        <div className="user-image__image-input-container">
                            <i className="user-image__edit-icon far fa-edit"></i>
                        </div>
                    </label>
                    <input
                        onChange={(e) => {
                            if (e.currentTarget.files) {
                                const url = URL.createObjectURL(
                                    e.currentTarget.files[0],
                                );

                                setPhotoUrl!(url);
                            }
                        }}
                        type="file"
                        className="user-image__image-input"
                        id="file-upload"
                    />
                </>
            )}
        </div>
    );
};

export default UserImage;
