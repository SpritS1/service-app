import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ServiceRequest from './AddServiceRequest';
import AuthContextProvider from 'contexts/NewAuthContext';

describe('ServiceRequest tests', () => {
    test('should have disabled button by default', async () => {
        const device = {
            model: 'Model',
            category: 'Category',
            serialNumber: 'serialNumber',
            manufacturer: 'Manufacturer',
            id: '1',
        };

        render(
            <AuthContextProvider>
                <ServiceRequest setIsServiceRequestOpen={jest.fn()} device={device} popup={''} />,
            </AuthContextProvider>,
        );

        const submitButton = screen.getByText(/Send request/i);

        expect(submitButton).toBeDisabled();
    });

    test('should have not disabled button after problem category is selected', async () => {
        const device = {
            model: 'Model',
            category: 'Category',
            serialNumber: 'serialNumber',
            manufacturer: 'Manufacturer',
            id: '1',
        };
        render(
            <AuthContextProvider>
                <ServiceRequest setIsServiceRequestOpen={jest.fn()} device={device} popup={''} />,
            </AuthContextProvider>,
        );

        const submitButton = screen.getByText(/Send request/i);

        const problemCategorySelect = screen.getByText(/Problem category/i);
        fireEvent.click(problemCategorySelect);

        const problemCategoryOption = screen.getByText(/Other/i);
        fireEvent.click(problemCategoryOption);

        expect(submitButton).not.toBeDisabled();
    });
});
