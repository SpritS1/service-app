import React, { ReactChildren } from 'react';
import './ModalWindow.scss';

interface Props {
    children: JSX.Element;
    onClose: () => void;
    title: string;
}

const ModalWindow = ({ onClose, children, title }: Props) => {
    return (
        <div className="modal-window">
            <div className="modal-window__header">
                <h2 className="modal-window__title">{title}</h2>
                <button
                    className="modal-window__exit-button fas fa-times"
                    onClick={onClose}
                />
            </div>
            {children}
        </div>
    );
};

export default ModalWindow;
