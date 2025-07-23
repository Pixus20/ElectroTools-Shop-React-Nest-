'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedDrawerProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function AnimatedDrawer({ open, onClose, children }: AnimatedDrawerProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed right-0 top-0 bottom-0 w-90 bg-white z-50 shadow-lg p-6"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
