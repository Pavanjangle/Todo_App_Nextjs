import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { validationSchema } from './dataValidation';


const useInputRegister = () => {

  const formObject = useForm<{ taskName: string }>({
    resolver: yupResolver(validationSchema),
});

  return { formObject };
};

export default useInputRegister;
