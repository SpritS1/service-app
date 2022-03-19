import Button from 'components/Button/Button';
import InputBasic from 'components/InputBasic/InputBasic';
import Popup from 'components/Popup/Popup';
import { FirebaseError } from 'firebase/app';
import {
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword,
} from 'firebase/auth';
import useAuth from 'hooks/useAuth';
import usePopup from 'hooks/usePopup';
import React, { useEffect, useState } from 'react';
import './ChangePassword.scss';

type Props = {};

const ChangePassword = (props: Props) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassowrd] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [arePasswordsSame, setArePasswordsSame] = useState(false);
    const [isFormFilled, setIsFormFilled] = useState(false);

    const { user } = useAuth();

    const popup = usePopup();

    useEffect(() => {
        if (newPassword && confirmNewPassword && oldPassword)
            setIsFormFilled(true);
        else setIsFormFilled(false);
    }, [newPassword, confirmNewPassword, oldPassword]);

    const changePassword = async (e: Event) => {
        e.preventDefault();
        // try {
        if (user && user.email) {
            popup.resetPopup();

            await reauthenticateWithCredential(
                user,
                EmailAuthProvider.credential(user.email, oldPassword),
            ).catch((error) => {
                console.log(error);
            });

            await updatePassword(user, newPassword).catch((error) => {
                console.log(JSON.stringify(error));
            });

            popup.setPopupContent('Password changed successfully');
            popup.setPopupType('default');
            popup.setIsPopupActive(true);
        }
        // } catch (error) {
        //     if (error && error.message) {
        //         popup.setPopupContent(error.message);
        //         popup.setPopupType('error');
        //         popup.setIsPopupActive(true);
        //     }
        // }
    };

    return (
        <>
            <form className="change-password">
                <h3 className="change-password__title">CHANGE PASSWORD</h3>
                <InputBasic
                    placeholder="Old password"
                    value={oldPassword}
                    setState={setOldPassword}
                    type="password"
                />
                <InputBasic
                    placeholder="New password"
                    value={newPassword}
                    setState={setNewPassowrd}
                    type="password"
                />
                <InputBasic
                    placeholder="Confirm new password"
                    value={confirmNewPassword}
                    setState={setConfirmNewPassword}
                    type="password"
                />
                <div className="change-password__button-container">
                    <Button
                        text="CHANGE PASSWORD"
                        backgroundColor="blue"
                        disabled={!isFormFilled}
                        action={changePassword}
                    />
                </div>
            </form>

            <Popup
                content={popup.popupContent}
                duration={4000}
                type={popup.popupType}
                isActive={popup.isPopupActive}
                setIsActive={popup.setIsPopupActive}
            />
        </>
    );
};

export default ChangePassword;
