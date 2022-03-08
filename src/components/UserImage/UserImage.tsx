import React from 'react';
import './UserImage.scss';

type Props = {
    isEditable?: boolean;
};

const UserImage = ({ isEditable = false }: Props) => {
    return (
        <div className="user-image">
            <img
                src={require('assets/random-man.jpg')}
                alt="user"
                className="user-image__image"
            />
            {isEditable && (
                <>
                    <label htmlFor="file-upload" className="user-image__label">
                        <div className="user-image__image-input-container">
                            <i className="user-image__edit-icon far fa-edit"></i>
                        </div>
                    </label>
                    <input
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
