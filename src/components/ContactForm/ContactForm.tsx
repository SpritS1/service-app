import Button from 'components/Button/Button';
import InputBasic from 'components/InputBasic/InputBasic';
import Popup from 'components/Popup/Popup';
import TextAreaInput from 'components/TextAreaInput/TextAreaInput';
import usePopup from 'hooks/usePopup';
import React, { useState } from 'react';
import './ContactForm.scss';

type Props = {};

const ContactForm = (props: Props) => {
    const [subject, setSubject] = useState('');
    const [messageContent, setMessageContent] = useState('');

    const popup = usePopup();

    const handleButtonClick = () => {
        setSubject('');
        setMessageContent('');
        popup.setPopupContent('Question sent');
        popup.setPopupType('default');
        popup.setIsPopupActive(true);
    };

    return (
        <form className="contact-form">
            <h3 className="contact-form__title">Contact us</h3>
            <InputBasic
                placeholder="Subject"
                value={subject}
                setState={setSubject}
                type={'text'}
            />
            <TextAreaInput
                label={'Your question'}
                value={messageContent}
                onChange={setMessageContent}
            />

            <Button
                text="SEND QUESTION"
                backgroundColor="blue"
                disabled={subject && messageContent ? false : true}
                action={handleButtonClick}
            />

            <Popup
                content={popup.popupContent}
                type={popup.popupType}
                duration={5000}
                isActive={popup.isPopupActive}
                setIsActive={popup.setIsPopupActive}
            />
        </form>
    );
};

export default ContactForm;
