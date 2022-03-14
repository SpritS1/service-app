import { useEffect } from 'react';
import './Popup.scss';

interface Props {
    content: string;
    duration: number;
    type?: 'default' | 'error';
    isActive: boolean;
    setIsActive: (value: boolean) => void;
}

const Popup = ({
    content,
    duration,
    type = 'default',
    isActive,
    setIsActive,
}: Props) => {
    useEffect(() => {
        if (isActive)
            setTimeout(() => {
                setIsActive(false);
            }, duration);
    }, [isActive, duration, setIsActive]);

    if (isActive)
        return (
            <div className={`popup ${type ? `popup--${type}` : ''}`}>
                {content}
            </div>
        );

    return null;
};

export default Popup;
