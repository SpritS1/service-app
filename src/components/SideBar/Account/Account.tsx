import './Account.scss';
import { Link } from 'react-router-dom';
import UserImage from 'components/UserImage/UserImage';

interface Props {}

const Account = (props: Props) => {
    return (
        <div className="account">
            <Link to="/profile" className="account__image-container">
                <UserImage />
            </Link>

            <span className="account__user-name">{'Philip Frank'}</span>
        </div>
    );
};

export default Account;
