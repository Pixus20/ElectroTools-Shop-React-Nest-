'use client';

import { useAuthModalStore } from '@/store/useAuthModalStore';
import { useUserStore } from '@/store/useUserStore';
import { useMutation } from '@apollo/client';
import { Button, CircularProgress, TextField } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';
import { REGISTER_MUTATION } from '../../../graphql/auth/register';

interface RegisterDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function RegisterDrawer({ open, onClose }: RegisterDrawerProps) {
  const setUser = useUserStore((state) => state.setUser);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const [register, { loading }] = useMutation(REGISTER_MUTATION);

  const handleRegister = async () => {
    setError('');

    if (password !== confirmPassword) {
      setError('Паролі не співпадають');
      return;
    }

    try {
      const { data } = await register({
        variables: {
          registerInput: {
            email,
            password,
          },
        },
      });

      const token = data.register;
      localStorage.setItem('token', token);

      const payload = JSON.parse(atob(token.split('.')[1]));

      setUser({
        id: payload.sub,
        name: payload.email,
      });

      onClose();
    } catch (err) {
      console.error(err);
      setError('Помилка при реєстрації. Спробуйте ще раз.');
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
            className="bg-white w-[350px] h-full p-6 overflow-y-auto shadow-lg"
            initial={{ x: 350 }}
            animate={{ x: 0 }}
            exit={{ x: 350 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">Реєстрація</h2>
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
            <TextField
              fullWidth
              margin="dense"
              label="Підтвердіть пароль"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <div className="flex justify-end mt-3">
              <Button onClick={onClose} sx={{ color: '#f97316' }}>Скасувати</Button>
              <Button
                onClick={handleRegister}
                variant="contained"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : null}
                sx={{ backgroundColor: '#f97316' }}
              >
                Зареєструватися
              </Button>
            </div>
            <p className="text-sm mt-4">
              Вже маєте акаунт?{' '}
              <button
                onClick={() => {
                  onClose();
                  useAuthModalStore.getState().openLogin();
                }}
                className="text-orange-500 hover:underline"
              >
                Увійти
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
