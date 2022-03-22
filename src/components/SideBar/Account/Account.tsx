import './Account.scss';
import { Link } from 'react-router-dom';
import ProfileImage from 'components/ProfileImage/ProfileImage';
import { useContext } from 'react';
import { UserDataContext } from 'contexts/UserDataContext';
import useAuth from 'hooks/useAuth';

interface Props {}

const Account = (props: Props) => {
    const { userData } = useContext(UserDataContext);
    const { user } = useAuth();

    return (
        <div className="account">
            <Link to="/profile" className="account__image-container">
                {user?.photoURL ? (
                    <ProfileImage photoUrl={user.photoURL} />
                ) : (
                    <i className="account__profile-icon far fa-user"></i>
                )}
            </Link>

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
