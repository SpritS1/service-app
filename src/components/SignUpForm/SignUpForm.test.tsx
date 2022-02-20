import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUpForm from './SignUpForm';
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from 'contexts/AuthContext';

const MockSignUpForm = () => {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <SignUpForm />
            </AuthContextProvider>
        </BrowserRouter>
    );
};

describe('Sign up Button', () => {
    test('Button should be disabled when inputs are empty', async () => {
        render(<MockSignUpForm />);

        const buttonElement = screen.getByRole('button');

        expect(buttonElement).toBeDisabled();
    });

    test('Sign up button should be active when all inputs are filled', async () => {
        render(<MockSignUpForm />);

        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const confirmPasswordInput =
            screen.getByPlaceholderText('Confirm password');
        const buttonElement = screen.getByRole('button');

        fireEvent.change(emailInput, { target: { value: 'mail@gmail.com' } });
        fireEvent.change(passwordInput, { target: { value: '123456' } });
        fireEvent.change(confirmPasswordInput, { target: { value: '123456' } });

        expect(buttonElement).not.toBeDisabled();
    });

    test("Should display error when password and confirmPassword don't match", async () => {
        render(<MockSignUpForm />);

        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const confirmPasswordInput =
            screen.getByPlaceholderText('Confirm password');
        const buttonElement = screen.getByRole('button');

        fireEvent.change(emailInput, { target: { value: 'mail@gmail.com' } });
        fireEvent.change(passwordInput, { target: { value: '1' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'abc' } });
        fireEvent.click(buttonElement);

        const validationError = screen.getByText('Passwords must match');

        expect(validationError).toBeVisible();
    });
});
