import { useForm as useReactHookForm } from 'react-hook-form';

export const useForm = (options = {}) => {
  return useReactHookForm({
    mode: 'onBlur',
    ...options,
  });
};
