import { useEffect } from 'react';

interface Props {
    onEnter?: (...value: any[]) => void;
    onEscape?: (...value: any[]) => void;
}

const useKeyPress = ({ onEnter, onEscape }: Props) => {
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (onEnter && e.key === 'Enter') {
                e.preventDefault();
                onEnter();
            } else if (onEscape && e.key === 'Escape') {
                e.preventDefault();
                onEscape();
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [onEnter, onEscape]);
};

export default useKeyPress;
