import React, { MouseEvent } from 'react';
import './Modal.scss';
import { createPortal } from 'react-dom';

type Props = {
    children: any;
    isOpen: boolean;
    onClose: () => void;
};

const Modal = ({ children, isOpen, onClose }: Props) => {
    if (!isOpen) return null;

    const onOverlayClick = (e: MouseEvent) => {
        if (e.target === e.currentTarget) onClose();
    };

    return createPortal(
        <div
            className="modal"
            onClick={(e) => onOverlayClick(e)}
            data-testid="modal"
        >
            {children}
        </div>,
        document.getElementById('modal') as HTMLElement,
    );
};

export default Modal;
