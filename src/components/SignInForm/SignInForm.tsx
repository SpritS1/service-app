import React, { useEffect, useState } from 'react';
import './SignInForm.scss';
import InputBorderless from 'components/InputBorderless/InputBorderless';
import Button from '../Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import ValidationError from 'components/ValidationError/ValidationError';
import Popup from 'components/Popup/Popup';
import usePopup from 'hooks/usePopup';
import InputBasic from 'components/InputBasic/InputBasic';
import Checkbox from 'components/Checkbox/Checkbox';
import { useAuth } from 'contexts/NewAuthContext';

const SignInForm = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isFormFilled, setIsFormFilled] = useState<boolean>(email && password ? true : false);

    const navigate = useNavigate();

    const { login } = useAuth();

    const popup = usePopup();

    useEffect(() => {
        if (email && password) setIsFormFilled(true);
        else setIsFormFilled(false);
    }, [email, password]);

    const handleLogin = async () => {
        popup.resetPopup();

        const result: boolean = await login(email, password);
        console.log(`Login result: ${result}`);
        if (result) navigate('/');
        else {
            popup.setPopupContent('Invalid credentials');
            popup.setIsPopupActive(true);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (isFormFilled && e.key === 'Enter') {
            e.preventDefault();

            handleLogin();
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
                    autofocus
                    autoComplete="off"
                    hasLabel={false}
                />
                {/* {errorField === 'email' && errorMessage && <ValidationError message={errorMessage} />} */}
                <InputBasic
                    placeholder="Password"
                    type="password"
                    value={password}
                    setState={setPassword}
                    // error={errorField === 'password' ? errorMessage : null}
                    autoComplete="off"
                    hasLabel={false}
                />
                {/* {errorField === 'password' && errorMessage && <ValidationError message={errorMessage} />} */}
                <Checkbox text="Remember me" />
            </form>

            <Button text="SIGN IN" backgroundColor="blue" action={handleLogin} disabled={!isFormFilled} />
            <span className="sign-in-form__sign-up">
                No account yet? &nbsp;
                <Link to="/auth/signup" className="sign-in-form__sign-up-link">
                    Sign up!
                </Link>
            </span>
            {/* <Link to="/forgot-password" className="sign-in-form__forgot-password">
                Forgot password?
            </Link> */}

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
