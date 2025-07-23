import { useMutation } from '@apollo/client';
import { LOGIN_USER } from './schema';

export const useLogin = () => {
  const [loginMutation, { data, loading, error }] = useMutation(LOGIN_USER);
  return { loginMutation, data, loading, error };
};
