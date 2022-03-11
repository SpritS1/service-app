import './Account.scss';
import { Link } from 'react-router-dom';
import UserImage from 'components/UserImage/UserImage';
import { useContext } from 'react';
import { UserDataContext } from 'contexts/UserDataContext';

interface Props {}

const Account = (props: Props) => {
    const { userData } = useContext(UserDataContext);

    return (
        <div className="account">
            <Link to="/profile" className="account__image-container">
                <UserImage />
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
