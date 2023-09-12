import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import './SignUpForm.scss';
import InputBorderless from 'components/InputBorderless/InputBorderless';
import Button from '../Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import ValidationError from 'components/ValidationError/ValidationError';
import InputBasic from 'components/InputBasic/InputBasic';
import Checkbox from 'components/Checkbox/Checkbox';
import { useAuth } from 'contexts/NewAuthContext';

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [isFormFilled, setIsFormFilled] = useState<boolean>(email && password && confirmedPassword ? true : false);

    const navigate = useNavigate();
    const { register } = useAuth();

    // check if form has been filled
    useEffect(() => {
        if (email && password && confirmedPassword) setIsFormFilled(true);
        else setIsFormFilled(false);
    }, [email, password, confirmedPassword]);

    const handleSignUp = async () => {
        if (password === confirmedPassword) {
            const isSuccessful = await register(email, password, firstname, lastname);
            if (isSuccessful) navigate('/auth/login');
        }
    };
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
                    autofocus
                    autoComplete="off"
                    hasLabel={false}
                />
                <InputBasic
                    placeholder="Password"
                    type="password"
                    value={password}
                    setState={setPassword}
                    autoComplete="off"
                    hasLabel={false}
                />
                <InputBasic
                    placeholder="Confirm password"
                    type="password"
                    value={confirmedPassword}
                    setState={setConfirmedPassword}
                    autoComplete="off"
                    hasLabel={false}
                />
                <div className="sign-up-form__name-container">
                    <InputBasic
                        placeholder="Firstname"
                        type="text"
                        value={firstname}
                        setState={setFirstname}
                        autofocus
                        autoComplete="off"
                        hasLabel={false}
                    />
                    <InputBasic
                        placeholder="Lastname"
                        type="text"
                        value={lastname}
                        setState={setLastname}
                        autofocus
                        autoComplete="off"
                        hasLabel={false}
                    />
                </div>

                <div className="sign-up-form__privacy-consent">
                    <Checkbox text="I agree to the" />
                    <Link to="/privacy-policy" className="sign-up-form__privacy-policy-link">
                        Privacy policy
                    </Link>
                </div>
            </form>

            <Button text="Sign Up" backgroundColor="blue" action={() => handleSignUp()} disabled={!isFormFilled} />
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
