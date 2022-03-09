import Button from 'components/Button/Button';
import HeaderDesktop from 'components/HeaderDesktop/HeaderDesktop';
import UserImage from 'components/UserImage/UserImage';
import React from 'react';
import './ProfilePage.scss';

type Props = {};

const ProfilePage = (props: Props) => {
    return (
        <div className="profile-page">
            <HeaderDesktop title={'Your Profile'} />
            <div className="profile-page__main">
                <div className="profile-page__profile-info">
                    <div className="profile-page__top">
                        <h3 className="profile-page__profile-info-title">
                            USER DETAILS
                        </h3>
                        <div className="profile-page__image-container">
                            <UserImage isEditable={true} />
                        </div>
                    </div>

                    <div className="profile-page__input-container">
                        <label htmlFor="" className="profile-page__label">
                            Name
                        </label>
                        <input type="text" className="profile-page__input" />
                    </div>
                    <div className="profile-page__input-container">
                        <label htmlFor="" className="profile-page__label">
                            Surname
                        </label>
                        <input type="text" className="profile-page__input" />
                    </div>
                    <div className="profile-page__input-container">
                        <label htmlFor="" className="profile-page__label">
                            Email
                        </label>
                        <input type="text" className="profile-page__input" />
                    </div>
                    <div className="profile-page__input-container">
                        <label htmlFor="" className="profile-page__label">
                            Phone
                        </label>
                        <input type="text" className="profile-page__input" />
                    </div>
                    <div className="profile-page__input-container">
                        <label htmlFor="" className="profile-page__label">
                            City
                        </label>
                        <input type="text" className="profile-page__input" />
                    </div>
                    <div className="profile-page__input-container">
                        <label htmlFor="" className="profile-page__label">
                            Post Code
                        </label>
                        <input type="text" className="profile-page__input" />
                    </div>
                    <div className="profile-page__input-container">
                        <label htmlFor="" className="profile-page__label">
                            Company
                        </label>
                        <input type="text" className="profile-page__input" />
                    </div>
                    <div className="profile-page__buttons-container">
                        <Button
                            text={'Update profile'}
                            backgroundColor="blue"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
