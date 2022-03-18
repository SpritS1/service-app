import Button from 'components/Button/Button';
import useKeyPress from 'hooks/useKeyPress';
import React from 'react';
import './ConfirmModal.scss';

type Props = {
    callback: (...args: any[]) => void;
    title: string;
    text: string;
    closeModal: (...args: any[]) => void;
};

const ConfirmModal = ({ callback, title, text, closeModal }: Props) => {
    useKeyPress({
        onEnter: () => {
            callback();
            closeModal();
        },
        onEscape: () => {
            closeModal();
        },
    });

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
