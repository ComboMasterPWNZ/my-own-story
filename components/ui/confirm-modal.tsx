'use client';

import { Modal } from './modal';
import { ThemedButton } from './themed-button';
import { useUITheme } from '@/context/UIThemeContext';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  variant?: 'danger' | 'primary';
}

export function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = 'Да',
  cancelText = 'Отмена',
  onConfirm,
  onCancel,
  isLoading = false,
  variant = 'danger'
}: ConfirmModalProps) {
  const { currentTheme, colorMode } = useUITheme();
  const colors = currentTheme.colors[colorMode];
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title={title}
      className="max-w-md"
    >
      <div className="space-y-8">
        <p 
          className="text-lg font-bold opacity-80 leading-relaxed" 
          style={{ color: colors.text.primary }}
        >
          {message}
        </p>
        
        <div className="flex gap-4">
          <ThemedButton 
            variant="outline" 
            onClick={onCancel} 
            disabled={isLoading}
            className="flex-1 py-4"
          >
            {cancelText}
          </ThemedButton>
          <ThemedButton 
            variant={variant === 'danger' ? 'danger' : 'primary'} 
            onClick={onConfirm} 
            loading={isLoading}
            className="flex-1 py-4"
          >
            {confirmText}
          </ThemedButton>
        </div>
      </div>
    </Modal>
  );
}
