'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { BookOpen, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '@/context/toast-context';
import { useTranslations } from 'next-intl';

export function AuthScreen() {
  const t = useTranslations('Auth');
  const appT = useTranslations('App');
  const { showToast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const supabase = createClient();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName }
          }
        });
        if (error) throw error;
        showToast(t('checkEmail'), 'info');
      }
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-8 justify-center bg-gradient-to-b from-[#EEF2FF] via-[#FDF4FF] to-[#FFF9F2]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-[#6366F1] to-[#A855F7] rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shadow-xl rotate-3">
          <BookOpen className="text-white w-12 h-12" />
        </div>
        <h1 className="text-4xl font-black text-[#4338ca] mb-2 tracking-tight">{appT('title')}</h1>
        <p className="text-[#6366F1] font-medium text-balance">{appT('description')}</p>
      </motion.div>

      <form onSubmit={handleAuth} className="space-y-4">
        {!isLogin && (
          <Input
            label={t('nameLabel')}
            placeholder={t('namePlaceholder')}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        )}
        <Input
          label={t('emailLabel')}
          type="email"
          placeholder="example@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label={t('passwordLabel')}
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-500 text-sm text-center font-bold">{error}</p>}

        <Button type="submit" loading={loading} className="w-full py-8 mt-2">
          {isLogin ? t('login') : t('register')}
          {!loading && <ArrowRight className="w-5 h-5" />}
        </Button>
      </form>

      <div className="mt-6 flex items-center gap-4">
        <div className="flex-1 h-px bg-slate-200" />
        <span className="text-slate-400 text-sm">{t('or')}</span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      <Button 
        variant="outline"
        onClick={handleGoogleLogin}
        disabled={loading}
        className="mt-6 w-full py-8 border-2 bg-white"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        {t('googleLogin')}
      </Button>

      <div className="mt-8 text-center">
        <button 
          onClick={() => setIsLogin(!isLogin)}
          className="text-[#2A4E77] font-semibold"
        >
          {isLogin ? t('noAccount') : t('hasAccount')}
        </button>
      </div>
    </div>
  );
}
