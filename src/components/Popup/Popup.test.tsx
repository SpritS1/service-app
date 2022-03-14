import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Popup from './Popup';

// test('should render popup with content', async () => {
//     const popupContent = "I'm popup";

//     render(<Popup content={popupContent} duration={5000} />);
//     const popupElement = screen.getByText(popupContent);

//     expect(popupElement).toBeInTheDocument();
// });

// test('should not be rendered after duration time', async () => {
//     jest.useFakeTimers();
//     const popupContent = "I'm popup";

//     render(<Popup content={popupContent} duration={1000} />);
//     const popupElement = screen.getByText(popupContent);

//     setTimeout(() => expect(popupElement).not.toBeInTheDocument(), 1005);
//     jest.runAllTimers();
// });
