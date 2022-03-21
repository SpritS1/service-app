import './Account.scss';
import { Link } from 'react-router-dom';
import UserImage from 'components/UserImage/UserImage';
import { useContext, useEffect } from 'react';
import { UserDataContext } from 'contexts/UserDataContext';
import useAuth from 'hooks/useAuth';

interface Props {}

const Account = (props: Props) => {
    const { userData } = useContext(UserDataContext);
    const { user } = useAuth();

    return (
        <div className="account">
            {user?.photoURL ? (
                <Link to="/profile" className="account__image-container">
                    <UserImage photoUrl={user.photoURL} />
                </Link>
            ) : (
                <i className="account__profile-icon far fa-user"></i>
            )}

            {userData && (
                <span className="account__user-name">
                    {userData.name && userData.surname
                        ? userData.name + ' ' + userData.surname
                        : 'Welcome User'}
                </span>
            )}
        </div>
    );
};

export default Account;
