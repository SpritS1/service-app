import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

describe('Button unit tests', () => {
    test('Button is disabled', async () => {
        render(<Button text={'Button'} />);

        const button = screen.getByRole('button');

        expect(button).toHaveTextContent('Button');
    });
    test('Button is not disabled by default', async () => {
        render(<Button text={'Button'} />);

        const button = screen.getByRole('button');

        expect(button).not.toBeDisabled();
    });
    test('Button is disabled when disabled prop is true', async () => {
        render(<Button text={'Button'} disabled={true} />);

        const button = screen.getByRole('button');

        expect(button).toBeDisabled();
    });
});
