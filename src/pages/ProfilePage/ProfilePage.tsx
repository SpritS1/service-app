import ChangePassword from 'components/ChangePassword/ChangePassword';
import HeaderDesktop from 'components/HeaderDesktop/HeaderDesktop';
import Loader from 'components/Loader/Loader';
import ProfileInfo from 'components/ProfileInfo/ProfileInfo';
import { UserDataContext } from 'contexts/UserDataContext';
import React, { useContext } from 'react';
import './ProfilePage.scss';

interface Props {}

const ProfilePage = (props: Props) => {
    const { userData, isFetching } = useContext(UserDataContext);

    return (
        <div className="profile-page">
            <HeaderDesktop title={'Your Profile'} />
            {isFetching && <Loader />}
            {!isFetching && (
                <div className="profile-page__main">
                    <ProfileInfo userData={userData} />

                    <ChangePassword />
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
