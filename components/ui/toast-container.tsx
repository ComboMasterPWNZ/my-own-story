'use client';

import { AnimatePresence } from 'framer-motion';
import { Toast } from './toast';
import { useToast } from '@/context/toast-context';

export function ToastContainer() {
  const { toasts, removeToast } = useToast();
  
  return (
    <div className="fixed top-4 left-0 right-0 flex flex-col items-center gap-2 z-[100] pointer-events-none">
      <AnimatePresence mode="wait">
        {toasts.map(toast => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => removeToast(toast.id)}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
