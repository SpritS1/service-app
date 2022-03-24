import React, { useEffect, useState } from 'react';
import './SignInForm.scss';
import InputBorderless from 'components/InputBorderless/InputBorderless';
import Button from '../Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import ValidationError from 'components/ValidationError/ValidationError';
import Popup from 'components/Popup/Popup';
import usePopup from 'hooks/usePopup';
import InputBasic from 'components/InputBasic/InputBasic';
import Logo from 'components/Logo/Logo';
import Checkbox from 'components/Checkbox/Checkbox';

const SignInForm = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isFormFilled, setIsFormFilled] = useState<boolean>(
        email && password ? true : false,
    );

    const navigate = useNavigate();

    const { signIn, errorMessage, errorField, cleanError } = useAuth();

    const popup = usePopup();

    useEffect(() => {
        if (email && password) setIsFormFilled(true);
        else setIsFormFilled(false);
    }, [email, password]);

    // remove errors when change page
    useEffect(() => {
        cleanError();
    }, [cleanError]);

    const handleSignIn = () => {
        popup.resetPopup();

        signIn(email, password, () => navigate('/'));

        if (errorMessage && errorField === 'popup') {
            popup.setPopupContent(errorMessage);
            popup.setPopupType('error');
            popup.setIsPopupActive(true);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (isFormFilled && e.key === 'Enter') {
            e.preventDefault();

            handleSignIn();
        }
    };

    return (
        <div className="sign-in-form">
            <h1 className="sign-in-form__title">Sign In</h1>
            <form
                className="sign-in-form__group sign-in-form__group--inputs"
                onKeyDown={(e) => handleKeyPress(e)}
                autoComplete="off"
            >
                <InputBasic
                    placeholder="Email"
                    type="email"
                    value={email}
                    setState={setEmail}
                    error={errorField === 'email' ? errorMessage : null}
                    autofocus
                    autoComplete="off"
                    hasLabel={false}
                />
                {errorField === 'email' && errorMessage && (
                    <ValidationError message={errorMessage} />
                )}
                <InputBasic
                    placeholder="Password"
                    type="password"
                    value={password}
                    setState={setPassword}
                    error={errorField === 'password' ? errorMessage : null}
                    autoComplete="off"
                    hasLabel={false}
                />
                {errorField === 'password' && errorMessage && (
                    <ValidationError message={errorMessage} />
                )}
                <Checkbox text="Remember me" />
            </form>

            <Button
                text="SIGN IN"
                backgroundColor="blue"
                action={handleSignIn}
                disabled={!isFormFilled}
            />
            <span className="sign-in-form__sign-up">
                No account yet? &nbsp;
                <Link to="/auth/signup" className="sign-in-form__sign-up-link">
                    Sign up!
                </Link>
            </span>
            <Link
                to="/forgot-password"
                className="sign-in-form__forgot-password"
            >
                Forgot password?
            </Link>

            <Popup
                content={popup.popupContent}
                duration={3000}
                type={popup.popupType}
                isActive={popup.isPopupActive}
                setIsActive={popup.setIsPopupActive}
            />
        </div>
    );
};

export default SignInForm;
