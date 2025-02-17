import { screen } from '@testing-library/react';
import { Text } from '../Text';
import { renderFormProvider } from '../../../testUtils/form';


describe('Text Component', () => {
    it('should display an error message when there is an error', () => {
        const errorMessage = 'This field is required';
        renderFormProvider(
            <Text formProps={{ name: 'text-error-test' }} />,
            {
                errors: {
                    'text-error-test': {
                        type: 'manual',
                        message: errorMessage,
                    },
                }
            }
        );
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it('should disable the input when disabled is true', () => {
        renderFormProvider(<Text formProps={{ name: 'test', disabled: true }} />);
        expect(screen.getByRole('textbox')).toBeDisabled();
    });
});