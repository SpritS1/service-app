import Button from 'components/Button/Button';
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.scss';

type Props = {};

const NotFoundPage = (props: Props) => {
    return (
        <div className="not-found-page">
            {/* <div className="not-found-page__container"> */}
            <h1 className="not-found-page__title">Page Not Found 🔎</h1>
            <p className="not-found-page__text">
                The page you were looking for could not be found. It might have
                been removed, renamed, or did not exist in the first place.
            </p>
            <Link className="not-found-page__button" to="/">
                Home
            </Link>
            {/* </div> */}
        </div>
    );
};

export default NotFoundPage;
