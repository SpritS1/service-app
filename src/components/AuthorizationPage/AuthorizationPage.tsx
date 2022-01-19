import React from 'react';
import './AuthorizationPage.scss';
import Input from './Input/Input';
import SecondaryText from './SecondaryText/SecondaryText';

interface Props {}

const AuthorizationPage = (props: Props) => {
    return (
        <div className="authorization-page">
            <div className="authorization-page__form">
                <h1 className="authorization-page__title">Sign In</h1>
                <div className="authorization-page__inputs">
                    <Input placeholder="Email" type="text" />
                    <Input placeholder="Password" type="password" />
                </div>
                <div className="authorization-page__secondary">
                    <SecondaryText
                        text="Forgot password?"
                        linkText="Click Here"
                        link="*"
                    />
                    <SecondaryText
                        text="Don't have an account?"
                        linkText="Register here"
                        link="*"
                    />
                </div>
                <button className="action-button">Login</button>
            </div>
        </div>
    );
};

export default AuthorizationPage;
