import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import './SignUpForm.scss';
import InputBorderless from 'components/InputBorderless/InputBorderless';
import Button from '../Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import ValidationError from 'components/ValidationError/ValidationError';
import InputBasic from 'components/InputBasic/InputBasic';
import Checkbox from 'components/Checkbox/Checkbox';

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [isFormFilled, setIsFormFilled] = useState<boolean>(
        email && password && confirmedPassword ? true : false,
    );

    const navigate = useNavigate();
    const {
        signUp,
        errorMessage,
        errorField,
        setErrorMessage,
        setErrorField,
        cleanError,
    } = useAuth();

    // check if form has been filled
    useEffect(() => {
        if (email && password && confirmedPassword) setIsFormFilled(true);
        else setIsFormFilled(false);
    }, [email, password, confirmedPassword]);

    // remove errors when change page
    useEffect(() => {
        cleanError();
    }, [cleanError]);

    const handleSignUp = useCallback(() => {
        if (password === confirmedPassword)
            signUp(email, password, async () => navigate('/'));
        else {
            setErrorMessage('Passwords must match');
            setErrorField('confirmPassword');
        }
    }, [
        confirmedPassword,
        email,
        navigate,
        password,
        setErrorField,
        setErrorMessage,
        signUp,
    ]);

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (isFormFilled && e.key === 'Enter') {
            e.preventDefault();

            handleSignUp();
        }
    };

    return (
        <div className="sign-up-form">
            <h1 className="sign-up-form__title">Sign Up</h1>
            <form
                className="sign-up-form__group sign-up-form__group--inputs"
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
                    error={errorField === 'password' ? errorMessage : null}
                    setState={setPassword}
                    autoComplete="off"
                    hasLabel={false}
                />
                {errorField === 'password' && errorMessage && (
                    <ValidationError message={errorMessage} />
                )}
                <InputBasic
                    placeholder="Confirm password"
                    type="password"
                    value={confirmedPassword}
                    error={
                        errorField === 'confirmPassword' ? errorMessage : null
                    }
                    setState={setConfirmedPassword}
                    autoComplete="off"
                    hasLabel={false}
                />
                {errorField === 'confirmPassword' && errorMessage && (
                    <ValidationError message={errorMessage} />
                )}

                <div className="sign-up-form__privacy-consent">
                    <Checkbox text="I agree to the" />
                    <Link
                        to="/privacy-policy"
                        className="sign-up-form__privacy-policy-link"
                    >
                        Privacy policy
                    </Link>
                </div>
            </form>

            <Button
                text="Sign Up"
                backgroundColor="blue"
                action={() => handleSignUp()}
                disabled={!isFormFilled}
            />
            <span className="sign-up-form__login">
                Already have an account? &nbsp;
                <Link to="/auth/login" className="sign-up-form__login-link">
                    Sign in!
                </Link>
            </span>
        </div>
    );
};

export default SignUpForm;
