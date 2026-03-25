'use client';

import { useState, useCallback } from 'react';

export interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

// Using a global variable to keep track of IDs across hook instances if needed, 
// though usually this hook is used in a single provider.
let nextId = 0;

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  
  const showToast = useCallback((message: string, type: ToastMessage['type'] = 'info') => {
    const id = nextId++;
    setToasts(prev => [...prev, { id, message, type }]);
    return id;
  }, []);
  
  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);
  
  return { toasts, showToast, removeToast };
}
