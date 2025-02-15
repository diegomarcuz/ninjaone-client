import { Select as SelectMUI, Typography, type SelectProps as SelectMuiProps } from '@mui/material';
import {
    useController,
    type UseControllerProps,
    type FieldValues,
} from 'react-hook-form';

export interface SelectProps<FormValue extends FieldValues>
    extends Omit<
        SelectMuiProps,
        | 'disabled'
        | 'id'
        | 'onChange'
        | 'value'
    > {
    formProps: Omit<UseControllerProps<FormValue>, 'rules'>;
}

export const Select = <FormValue extends FieldValues>({
    children,
    formProps,
    ...rest
}: SelectProps<FormValue>) => {
    const {
        field: { value, onChange, name, disabled },
        fieldState: { error },
    } = useController<FormValue>(formProps);

    return (
        <div>
            <SelectMUI
                variant='outlined'
                {...rest}
                id={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                error={!!error}
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
