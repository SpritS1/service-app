import React from 'react';
import './ProfileImage.scss';

type Props = {
    src: string | null;
};

const ProfileImage = ({ src }: Props) => {
    return (
        <div className={`profile-image ${src ? '' : 'profile-image--no-photo'}`}>
            {src ? (
                <img src={src} alt="user" className="profile-image__image" />
            ) : (
                <i className="profile-image__no-photo-icon far fa-user" />
            )}
        </div>
    );
};

export default ProfileImage;
