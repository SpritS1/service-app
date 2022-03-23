import React from 'react';
import './ProfileImage.scss';

type Props = {
    photoUrl: string | null;
};

const ProfileImage = ({ photoUrl }: Props) => {
    return (
        <div
            className={`profile-image ${
                photoUrl ? '' : 'profile-image--no-photo'
            }`}
        >
            {photoUrl ? (
                <img
                    src={photoUrl}
                    alt="user"
                    className="profile-image__image"
                />
            ) : (
                <i className="profile-image__no-photo-icon far fa-user" />
            )}
        </div>
    );
};

export default ProfileImage;
