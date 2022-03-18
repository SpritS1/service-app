import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import useKeyPress from './useKeyPress';
import { useState } from 'react';

const TestComponent = () => {
    const [text, setText] = useState('');

    useKeyPress({
        onEnter: () => setText('Enter'),
        onEscape: () => setText('Escape'),
    });

    return (
        <div className="test-component" data-testid="component">
            {text}
        </div>
    );
};

describe('After render', () => {
    it('should not display any text after render', () => {
        render(<TestComponent />);

        const component = screen.getByTestId('component');

        expect(component).toHaveTextContent('');
    });
});

describe('Clicks escape and enter', () => {
    it('should call given onEnter callback when Enter key is clicked', () => {
        render(<TestComponent />);

        const component = screen.getByTestId('component');

        fireEvent.keyDown(document, { key: 'Enter' });

        expect(component).toHaveTextContent(/enter/i);
    });

    it('should call given onEnter callback when Escape key is clicked', () => {
        render(<TestComponent />);

        const component = screen.getByTestId('component');

        fireEvent.keyDown(document, { key: 'Escape' });

        expect(component).toHaveTextContent(/escape/i);
    });
});

describe('Only one value passed', () => {
    it('should not display any text when Enter is clicked', () => {
        const TestComponent = () => {
            const [text, setText] = useState('');

            useKeyPress({
                onEscape: () => setText('Escape'),
            });

            return (
                <div className="test-component" data-testid="component">
                    {text}
                </div>
            );
        };

        render(<TestComponent />);

        const component = screen.getByTestId('component');

        fireEvent.keyDown(document, { key: 'Enter' });

        expect(component).toHaveTextContent('');
    });

    it('should not display any text when Escape is clicked', () => {
        const TestComponent = () => {
            const [text, setText] = useState('');

            useKeyPress({
                onEnter: () => setText('Enter'),
            });

            return (
                <div className="test-component" data-testid="component">
                    {text}
                </div>
            );
        };

        render(<TestComponent />);

        const component = screen.getByTestId('component');

        fireEvent.keyDown(document, { key: 'Escape' });

        expect(component).toHaveTextContent('');
    });
});
