import React from 'react';
import './ProfileImage.scss';

type Props = {
    photoUrl: string | null;
};

const ProfileImage = ({ photoUrl }: Props) => {
    return (
        <div className="user-image">
            {photoUrl ? (
                <img src={photoUrl} alt="user" className="user-image__image" />
            ) : (
                <i className="user-image__no-photo-icon far fa-user" />
            )}
        </div>
    );
};

export default ProfileImage;
