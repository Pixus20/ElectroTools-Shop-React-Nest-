'use client';

import { useAuthModalStore } from '@/store/useAuthModalStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useUserStore } from '@/store/useUserStore';
import { useMutation } from '@apollo/client';
import { Button, CircularProgress, TextField } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';
import { LOGIN_MUTATION } from '../../../graphql/auth/login';

interface LoginDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginDrawer({ open, onClose }: LoginDrawerProps) {
  const setUser = useUserStore((state) => state.setUser);
  const authLogin = useAuthStore((state) => state.login);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const [login, { loading }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async () => {
    setError('');
    try {
      const { data } = await login({
        variables: { loginInput: { email, password } },
      });

      const token = data.login;
      localStorage.setItem('token', token);
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser({ id: payload.sub, name: payload.email });
      onClose();
    } catch (err) {
      setError('Невірний логін або пароль.');
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/40 z-50 flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white w-[350px] h-full p-6 shadow-lg overflow-y-auto"
            initial={{ x: 350 }}
            animate={{ x: 0 }}
            exit={{ x: 350 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">Вхід</h2>
            <TextField
              fullWidth
              margin="dense"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Пароль"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <div className="flex justify-end mt-3">
              <Button onClick={onClose} sx={{ color: '#f97316' }}>
                Скасувати
              </Button>
              <Button
                onClick={handleLogin}
                variant="contained"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : null}
                sx={{ backgroundColor: '#f97316' }}
              >
                Увійти
              </Button>
            </div>
            <p className="text-sm mt-4">
              Ще не маєте акаунту?{' '}
              <button
                onClick={() => {
                  onClose();
                  useAuthModalStore.getState().openRegister();
                }}
                className="text-orange-500 hover:underline"
              >
                Зареєструватися
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
