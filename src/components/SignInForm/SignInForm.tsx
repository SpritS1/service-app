import React, { useEffect, useState } from 'react';
import './SignInForm.scss';
import InputBorderless from 'components/InputBorderless/InputBorderless';
import Button from '../Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import ValidationError from 'components/ValidationError/ValidationError';
import Popup from 'components/Popup/Popup';

const SignInForm = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isFormFilled, setIsFormFilled] = useState<boolean>(
        email && password ? true : false,
    );

    const navigate = useNavigate();
    const { signIn, errorMessage, errorField, cleanError } = useAuth();

    useEffect(() => {
        if (email && password) setIsFormFilled(true);
        else setIsFormFilled(false);
    }, [email, password]);

    // remove errors when change page
    useEffect(() => {
        cleanError();
    }, [cleanError]);

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (isFormFilled && e.key === 'Enter') {
            e.preventDefault();

            signIn(email, password, () => navigate('/'));
        }
    };

    return (
        <div className="sign-in-form">
            <h1 className="sign-in-form__title">Sign In</h1>
            <form
                className="sign-in-form__group sign-in-form__group--inputs"
                onKeyDown={(e) => handleKeyPress(e)}
            >
                <InputBorderless
                    placeholder="Email"
                    type="text"
                    value={email}
                    setState={setEmail}
                    error={errorField === 'email' ? errorMessage : null}
                    autofocus
                />
                {errorField === 'email' && errorMessage && (
                    <ValidationError message={errorMessage} />
                )}
                <InputBorderless
                    placeholder="Password"
                    type="password"
                    value={password}
                    setState={setPassword}
                    error={errorField === 'password' ? errorMessage : null}
                />
                {errorField === 'password' && errorMessage && (
                    <ValidationError message={errorMessage} />
                )}
                {errorField === 'popup' && errorMessage && (
                    <Popup
                        content={errorMessage}
                        duration={3000}
                        type={'error'}
                    />
                )}
            </form>
            <Link
                to="/forgot-password"
                className="sign-in-form__forgot-password"
            >
                Forgot password?
            </Link>
            <Button
                text="Login"
                backgroundColor="white"
                action={() => signIn(email, password, () => navigate('/'))}
                disabled={!isFormFilled}
            />
            <span className="sign-in-form__sign-up">
                No account yet? &nbsp;
                <Link to="/auth/signup" className="sign-in-form__sign-up-link">
                    Sign Up
                </Link>
            </span>
        </div>
    );
};

export default SignInForm;
