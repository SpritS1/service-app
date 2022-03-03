import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SelectButton from './SelectButton';

describe('Select button', () => {
    test('Opens dropdown when clicked', async () => {
        render(
            <SelectButton
                text="Select"
                options={['Optivix', 'Akagi', 'ManuZ', 'Arctic']}
                selectedOption={null}
                setSelectedOption={jest.fn()}
            />,
        );

        const selectButton = screen.getByRole('button');
        const dropdown = screen.getByRole('list');

        fireEvent.click(selectButton);

        expect(dropdown).toBeVisible();
    });

    // test('Change selectedOption when click on list item', async () => {
    //     render(
    //         <SelectButton
    //             text="Select"
    //             options={['Optivix', 'Akagi', 'ManuZ', 'Arctic']}
    //             selectedOption={'Arctic'}
    //             setSelectedOption={jest.fn()}
    //         />,
    //     );
    //     const selectButton = screen.getByRole('button');
    //     const dropdownItem = screen.getByText('Arctic');

    //     fireEvent.click(dropdownItem);

    //     expect(selectButton).toHaveTextContent('Arctic');
    // });
});
