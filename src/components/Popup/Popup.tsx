import { useEffect, useState } from 'react';
import './Popup.scss';

interface Props {
    content: string;
    duration: number;
    type?: 'default' | 'error';
}

const Popup = ({ content, duration, type = 'default' }: Props) => {
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        setTimeout(() => setIsActive(false), duration);
    }, [duration]);

    if (isActive)
        return (
            <div className={`popup ${type ? `popup--${type}` : ''}`}>
                {content}
            </div>
        );

    return null;
};

export default Popup;
