import { Select as SelectMUI, Typography, SelectProps } from '@mui/material';
import {
    useController,
    type UseControllerProps,
    type FieldValues,
} from 'react-hook-form';

export interface DropdownRHFProps<FormValue extends FieldValues>
    extends Omit<
        SelectProps,
        | 'disabled'
        | 'id'
        | 'onChange'
        | 'value'
    > {
    formProps: Omit<UseControllerProps<FormValue>, 'rules'>;
}

export const Select = <FormValue extends FieldValues>({
    children,
    label,
    formProps,
    ...rest
}: DropdownRHFProps<FormValue>) => {
    const {
        field: { value, onChange, name, disabled },
        fieldState: { error },
    } = useController<FormValue>(formProps);

    return (
        <div className="dropdown-rhf">
            <SelectMUI
                {...rest}
                label={label}
                id={name}
                value={value}
                onChange={onChange}
                error={!!error}
                disabled={disabled}
            >
                {children}
            </SelectMUI>

            {error?.message && (
                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                    {error.message}
                </Typography>
            )}
        </div>
    );
};
