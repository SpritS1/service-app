import ChangePassword from 'components/ChangePassword/ChangePassword';
import HeaderDesktop from 'components/HeaderDesktop/HeaderDesktop';
import ProfileInfo from 'components/ProfileInfo/ProfileInfo';
import React from 'react';
import './ProfilePage.scss';
import { useAuth } from 'contexts/NewAuthContext';

interface Props {}

const ProfilePage = (props: Props) => {
    const { user } = useAuth();
    return (
        <div className="profile-page">
            <HeaderDesktop title={'Your Profile'} />
            <div className="profile-page__main">
                <ProfileInfo userData={user} />

                <ChangePassword />
            </div>
        </div>
    );
};

export default ProfilePage;
