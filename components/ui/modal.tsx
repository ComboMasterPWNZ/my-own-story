'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
  style,
}: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={cn(
              "relative w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col max-h-[90vh]",
              className
            )}
            style={style}
          >
            <div className="flex items-center justify-between border-b border-[var(--color-border)] p-6 sm:p-8">
              <div>
                {title && (
                  <h2 className="text-2xl font-black text-[var(--color-text)]">
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="text-sm font-bold text-[var(--color-text)] opacity-40">
                    {description}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="rounded-2xl bg-[var(--color-text)]/5 p-3 transition-colors hover:bg-[var(--color-text)]/10"
              >
                <X className="h-6 w-6 text-[var(--color-text)]" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
