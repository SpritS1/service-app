import { useEffect, useState } from 'react';

const usePopup = () => {
    const [isPopupActive, setIsPopupActive] = useState(false);
    const [popupContent, setPopupContent] = useState('');
    const [popupType, setPopupType] = useState<'default' | 'error'>('default');

    useEffect(() => {
        console.log(isPopupActive);
    }, [isPopupActive]);

    const resetPopup = () => {
        setPopupContent('');
        setPopupType('default');
        setIsPopupActive(false);
    };

    return {
        isPopupActive,
        setIsPopupActive,
        popupContent,
        setPopupContent,
        popupType,
        setPopupType,
        resetPopup,
    };
};

export default usePopup;
