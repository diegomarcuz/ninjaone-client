import { screen } from '@testing-library/react';
import { Select } from '../Select';
import { renderFormProvider } from '../../../testUtils/form';
import { MenuItem } from '@mui/material';


describe('Select Component', () => {
    it('should display error message when there is an error', () => {
        const errorMessage = 'This field is required';
        renderFormProvider(
            <Select
                formProps={{
                    name: 'select-error-test',
                }
                }>
                <MenuItem value="Option1">Option 1</MenuItem>
            </Select>,
            {
                errors: {
                    'select-error-test': {
                        type: 'manual',
                        message: errorMessage,
                    },
                },
            },
        );

        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
})