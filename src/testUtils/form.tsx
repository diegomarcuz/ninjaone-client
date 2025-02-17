import type { z } from 'zod';
import { render } from '@testing-library/react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    useForm,
    FormProvider as RHFFormProvider,
    type UseFormProps,
} from 'react-hook-form';

type FormProps<SchemaType> = Omit<UseFormProps, 'resolver'> &
    React.PropsWithChildren<{
        schema?: SchemaType;
    }>;


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Form = <SchemaType extends z.Schema<any, any>>({
    children,
    schema,
    ...formProps
}: FormProps<SchemaType>) => {
    const methods = useForm({
        ...formProps,
        resolver: schema ? zodResolver<SchemaType>(schema) : undefined,
    });

    const handleReset = () => {
        methods.reset();
    };

    return (
        <RHFFormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit((data) => data)}
                onReset={handleReset}
            >
                {children}
            </form>
        </RHFFormProvider>
    );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const renderFormProvider = <SchemaType extends z.Schema<any, any>>(
    children: React.ReactNode,
    formProps?: UseFormProps,
    schema?: SchemaType,
) => {
    render(
        <Form<SchemaType> {...formProps} schema={schema}>
            {children}
        </Form>,
    );
};
