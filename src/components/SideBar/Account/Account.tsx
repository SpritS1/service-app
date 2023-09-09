import React from 'react';
import './Account.scss';
import { Link } from 'react-router-dom';
import ProfileImage from 'components/ProfileImage/ProfileImage';
import { useAuth } from 'contexts/NewAuthContext';

interface Props {}

const Account = (props: Props) => {
    const { user } = useAuth();
    console.log(user);
    return (
        <div className="account">
            <Link to="/profile" className="account__image-container">
                {user?.photoUrl ? (
                    <ProfileImage src={user.photoUrl} />
                ) : (
                    <i className="account__profile-icon far fa-user"></i>
                )}
            </Link>

            <span className="account__user-name">{user ? `${user.firstName} ${user.lastName}` : 'Welcome User'}</span>
        </div>
    );
};

export default Account;
