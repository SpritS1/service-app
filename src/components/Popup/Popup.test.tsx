import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Popup from './Popup';
import { useState } from 'react';
import { act } from 'react-dom/test-utils';

const popupContent = "I'm popup";

const TestContainer = () => {
    const [isActive, setIsActive] = useState(true);
    return (
        <>
            <Popup
                content={popupContent}
                duration={1000}
                isActive={isActive}
                setIsActive={setIsActive}
            />
        </>
    );
};

test('should render popup with content', async () => {
    render(<TestContainer />);
    const popupElement = screen.getByText(popupContent);

    expect(popupElement).toHaveTextContent(popupContent);
});

test('should not be rendered after duration time', async () => {
    jest.useFakeTimers();
    const popupContent = "I'm popup";

    render(<TestContainer />);
    const popupElement = screen.getByText(popupContent);

    act(() => {
        jest.runAllTimers();
        setTimeout(() => expect(popupElement).not.toBeInTheDocument(), 1005);
    });
});
