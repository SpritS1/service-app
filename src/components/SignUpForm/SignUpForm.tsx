import { useState, useEffect, useCallback } from 'react';
import './SignUpForm.scss';
import Input from 'components/Input/Input';
import Button from '../Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import ValidationError from 'components/ValidationError/ValidationError';
import Popup from 'components/Popup/Popup';

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
            signUp(email, password, () => navigate('/'));
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
            <div
                className="sign-up-form__group sign-up-form__group--inputs"
                onKeyDown={(e) => handleKeyPress(e)}
            >
                <Input
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
                <Input
                    placeholder="Password"
                    type="password"
                    value={password}
                    error={errorField === 'password' ? errorMessage : null}
                    setState={setPassword}
                />
                {errorField === 'password' && errorMessage && (
                    <ValidationError message={errorMessage} />
                )}
                <Input
                    placeholder="Confirm password"
                    type="password"
                    value={confirmedPassword}
                    error={
                        errorField === 'confirmPassword' ? errorMessage : null
                    }
                    setState={setConfirmedPassword}
                />
                {errorField === 'confirmPassword' && errorMessage && (
                    <ValidationError message={errorMessage} />
                )}
                {errorField === 'popup' && errorMessage && (
                    <Popup
                        content={errorMessage}
                        duration={3000}
                        type={'error'}
                    />
                )}
            </div>
            <Button
                text="Sign Up"
                backgroundColor="white"
                action={() => handleSignUp()}
                disabled={!isFormFilled}
            />
            <span className="sign-up-form__login">
                Already have an account? &nbsp;
                <Link to="/auth/login" className="sign-up-form__login-link">
                    Login
                </Link>
            </span>
        </div>
    );
};

export default SignUpForm;
