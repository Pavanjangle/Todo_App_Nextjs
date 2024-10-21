import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './validation';
import { useForm } from 'react-hook-form';

const useInputRegister = () => {

  const formObject = useForm<{ taskName: string }>({
    resolver: yupResolver(validationSchema),
});

  return { formObject };
};

export default useInputRegister;
