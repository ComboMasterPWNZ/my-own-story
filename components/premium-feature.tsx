'use client';

import { ReactNode } from 'react';
import { useProfile } from '@/hooks/useProfile';
import { Crown, Lock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PremiumFeatureProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
}

export function PremiumFeature({ children, fallback, className }: PremiumFeatureProps) {
  const { isPremium, isLoading } = useProfile();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (isPremium) {
    return <>{children}</>;
  }

  // Если передан кастомный fallback, используем его
  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative overflow-hidden rounded-[2.5rem] p-8 text-center border-2 border-dashed border-indigo-500/30 bg-slate-900/40 backdrop-blur-xl",
        className
      )}
    >
      {/* Декоративное свечение на фоне */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2rem] flex items-center justify-center shadow-xl shadow-indigo-500/20 rotate-3">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="absolute -top-2 -right-2 bg-amber-400 p-2 rounded-full shadow-lg"
          >
            <Crown className="w-4 h-4 text-white" />
          </motion.div>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-black text-white flex items-center justify-center gap-2">
            🔒 Только для премиум
          </h3>
          <p className="text-slate-400 font-medium leading-relaxed max-w-[280px] mx-auto">
            Эта игра доступна только подписчикам Premium. Оформи подписку, чтобы играть и получать ещё больше волшебства!
          </p>
        </div>

        <button 
          onClick={() => {
            // В будущем здесь будет вызов модалки оплаты или переход в профиль
            console.log('Navigate to upgrade');
            window.dispatchEvent(new CustomEvent('open-premium-modal'));
          }}
          className="group relative w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl font-black text-white shadow-lg shadow-indigo-500/25 active:scale-95 transition-all overflow-hidden"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300" />
            Узнать о Premium
          </span>
          {/* Эффект блика при наведении */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </button>
      </div>
    </motion.div>
  );
}
