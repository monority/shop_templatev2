import { useForm as useReactHookForm, UseFormProps, UseFormReturn, FieldValues } from 'react-hook-form';

export const useForm = <T extends FieldValues = FieldValues>(options: UseFormProps<T> = {}): UseFormReturn<T> => {
  return useReactHookForm<T>({
    mode: 'onBlur',
    ...options,
  });
};
