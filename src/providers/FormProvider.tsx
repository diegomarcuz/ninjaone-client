import {
    type FieldValues,
    FormProvider as FormProviderRHF,
    type SubmitHandler,
    useForm,
    type UseFormProps,
} from 'react-hook-form';

interface FormProviderProps<TFieldValues extends FieldValues> {
    formProps?: UseFormProps<TFieldValues>;
    onSubmit: SubmitHandler<TFieldValues>;
}

const FormProvider = <TFieldValues extends FieldValues>({
    children,
    formProps,
    onSubmit,
    ...rest
}: React.PropsWithChildren<FormProviderProps<TFieldValues>>) => {
    const methods = useForm<TFieldValues>(formProps);


    return (
        <FormProviderRHF {...methods}>
            <form {...rest} onSubmit={methods.handleSubmit(onSubmit)}>
                {children}
            </form>
        </FormProviderRHF>
    );
};

export default FormProvider;
