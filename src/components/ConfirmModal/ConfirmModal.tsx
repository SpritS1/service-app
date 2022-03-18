import Button from 'components/Button/Button';
import React, { useEffect } from 'react';
import './ConfirmModal.scss';

type Props = {
    callback: (...args: any[]) => void;
    title: string;
    text: string;
    closeModal: (...args: any[]) => void;
};

const ConfirmModal = ({ callback, title, text, closeModal }: Props) => {
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                callback();
                closeModal();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                closeModal();
            }
        };

        document.addEventListener('keydown', (e) => handleKeyPress(e));

        return document.removeEventListener('keydown', (e) =>
            handleKeyPress(e),
        );
    }, [callback, closeModal]);

    return (
        <div className="confirm-modal">
            <h4 className="confirm-modal__title">{title}</h4>
            <p className="confirm-modal__text">{text}</p>
            <div className="confirm-modal__buttons">
                <Button
                    text="CONFIRM"
                    backgroundColor="blue"
                    action={() => {
                        callback();
                        closeModal();
                    }}
                />
                <Button text="DISMISS" action={closeModal} />
            </div>
        </div>
    );
};

export default ConfirmModal;
