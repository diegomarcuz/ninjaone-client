import { TextField, type TextFieldProps } from '@mui/material';
import type {
    Path,
    UseControllerProps,
    FieldValues,
} from 'react-hook-form';

import { useController } from 'react-hook-form';

export type TextProps<FormValue extends FieldValues> = Omit<
    TextFieldProps,
    'disabled' | 'id' | 'onChange' | 'value'
> & {
    formProps: Omit<UseControllerProps<FormValue>, 'rules'>;
};

export const Text = <FormValue extends FieldValues>({
    children,
    formProps,
    ...rest
}: React.PropsWithChildren<TextProps<FormValue>>) => {

    const {
        field: { value, onChange, name, disabled },
        fieldState: { error },
    } = useController<FormValue, Path<FormValue>>(formProps);

    return (
        <TextField
            {...rest}
            id={name}
            disabled={disabled}
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : ""}
        >
            {children}
        </TextField>
    );
};
