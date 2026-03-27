'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { ArrowLeft, LogOut, Trash2, Crown, Book, Heart, Palette, Sparkles, Plus, User, Pencil, PlayCircle, MessageSquare, Send, Languages, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTranslations, useLocale } from 'next-intl';
import { ChildProfile, Appearance } from '@/lib/types';
import { ChildProfileModal } from './child-profile-modal';
import { LanguageSwitcher } from './language-switcher';
import { StoryLanguagePicker } from './story-language-picker';
import Image from 'next/image';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { useToast } from '@/context/toast-context';
import { ConfirmModal } from './ui/confirm-modal';
import { useUITheme } from '@/context/UIThemeContext';

interface ProfileScreenProps {
  profile: any;
  onBack: () => void;
  onUpdateProfile: (updated: any) => void;
}

export function ProfileScreen({ profile, onBack, onUpdateProfile }: ProfileScreenProps) {
  const t = useTranslations('Profile');
  const locale = useLocale();
  const { showToast } = useToast();
  const { currentTheme, colorMode } = useUITheme();
  const [stats, setStats] = useState({ total: 0, favorites: 0 });
  const [children, setChildren] = useState<ChildProfile[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState<ChildProfile | undefined>();
  const [feedback, setFeedback] = useState('');
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [showUpgradeConfirm, setShowUpgradeConfirm] = useState(false);
  const [showDeleteAccountConfirm, setShowDeleteAccountConfirm] = useState(false);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const supabase = createClient();
  const colors = currentTheme.colors[colorMode];

  const fetchChildren = async () => {
    if (!profile?.id) return;
    const response = await fetch('/api/children');
    if (response.ok) {
      const data = await response.json();
      setChildren(data);
    }
  };

  const handleSendFeedback = async () => {
    if (!feedback.trim() || feedback.length > 500) return;
    
    setIsSendingFeedback(true);
    
    // Analytics event
    console.log('[Analytics] Feedback sent:', { userId: profile.id, length: feedback.length });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Feedback received:', feedback);
    setFeedback('');
    setIsSendingFeedback(false);
    setFeedbackSent(true);
    
    setTimeout(() => setFeedbackSent(false), 3000);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!profile?.id) return;
      
      // Fetch stats
      const { data: stories } = await (supabase as any)
        .from('stories')
        .select('is_favorite')
        .eq('user_id', profile.id);
      
      if (stories) {
        setStats({
          total: stories.length,
          favorites: stories.filter((s: any) => s.is_favorite).length
        });
      }

      // Fetch children
      fetchChildren();
    };

    fetchData();
  }, [profile?.id, supabase]);

  const handleThemeChange = async (themeId: string) => {
    const updatedProfile = { ...profile, theme: themeId };
    onUpdateProfile(updatedProfile);
    
    await (supabase as any)
      .from('profiles')
      .update({ theme: themeId })
      .eq('id', profile.id);
  };

  const handleAddChild = () => {
    setSelectedChild(undefined);
    setIsModalOpen(true);
  };

  const handleEditChild = (child: ChildProfile) => {
    setSelectedChild(child);
    setIsModalOpen(true);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  const handleDeleteAccount = async () => {
    showToast(t('deleteAccountRequest'), 'info');
    setShowDeleteAccountConfirm(false);
  };

  const handleUpgrade = async () => {
    setIsUpgrading(true);
    try {
      const { error } = await (supabase as any)
        .from('profiles')
        .update({ subscription_tier: 'premium' })
        .eq('id', profile.id);
      
      if (error) throw error;
      
      onUpdateProfile({ ...profile, subscription_tier: 'premium' });
      showToast(t('premiumSuccess'), 'success');
    } catch (error: any) {
      showToast(t('premiumError') + error.message, 'error');
    } finally {
      setIsUpgrading(false);
      setShowUpgradeConfirm(false);
    }
  };

  const handleLanguageChange = (newLocale: string) => {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    window.location.reload();
  };

  const freeLimit = 3;
  const used = profile?.free_generations_used || 0;
  const remaining = Math.max(0, freeLimit - used);
  const progress = (used / freeLimit) * 100;

  const isPremium = profile?.subscription_tier === 'premium';

  const currentLanguage = locale === 'ru' ? { label: 'Русский', flag: '🇷🇺' } : { label: 'English', flag: '🇺🇸' };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-6 space-y-8 pb-12">
        {/* Profile Info */}
        <Card className={cn("p-8 flex flex-col items-center text-center border-2")}>
          <div 
            className="w-24 h-24 rounded-[2rem] flex items-center justify-center text-white text-4xl font-black mb-4 shadow-lg rotate-3"
            style={{ backgroundColor: colors.primary }}
          >
            {profile?.full_name?.[0] || 'U'}
          </div>
          <h3 className="text-2xl font-black" style={{ color: colors.text.primary }}>{profile?.full_name}</h3>
          <p className="opacity-40 font-bold" style={{ color: colors.text.secondary }}>{profile?.email}</p>
        </Card>

        {/* Language Switcher */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <Languages className="w-5 h-5 opacity-40" />
            <h3 className="text-xl font-black">{t('language')}</h3>
          </div>
          <LanguageSwitcher />
        </div>

        {/* Story Language Picker */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <BookOpen className="w-5 h-5 opacity-40" />
            <h3 className="text-xl font-black">{t('storyLanguage')}</h3>
          </div>
          <StoryLanguagePicker />
        </div>

        {/* Children Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-black">{t('myChildren')}</h3>
            <Button 
              size="sm"
              onClick={handleAddChild}
              className="bg-purple-500 shadow-purple-500/20"
            >
              <Plus className="w-4 h-4" />
              {t('addChild')}
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <AnimatePresence mode="popLayout">
              {children.length > 0 ? (
                children.map((child, index) => {
                  const appearance = child.appearance as Appearance | null;
                  return (
                    <motion.div
                      key={child.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card 
                        className={cn("p-4 flex items-center justify-between group border-2 rounded-[2rem]")}
                      >
                        <div className="flex items-center gap-4">
                          <div 
                            className="w-14 h-14 rounded-full overflow-hidden border-4 relative flex items-center justify-center transition-colors"
                            style={{ 
                              borderColor: colors.primary,
                              backgroundColor: !child.avatar_url ? `${colors.primary}20` : 'transparent'
                            }}
                          >
                            {child.avatar_url ? (
                              <Image src={child.avatar_url} alt={child.name} fill className="object-cover" />
                            ) : (
                              <span className="text-xl font-black uppercase" style={{ color: colors.primary }}>
                                {child.name.charAt(0)}
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="font-black text-lg" style={{ color: colors.text.primary }}>{child.name}</p>
                            <p className="text-xs font-bold opacity-40 uppercase tracking-wider" style={{ color: colors.text.secondary }}>
                              {child.age} {child.age === 1 ? t('age1') : child.age < 5 ? t('age2') : t('age5')} • {appearance?.gender === 'boy' ? t('boy') : t('girl')}
                            </p>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleEditChild(child)}
                          className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Pencil className="w-4 h-4 text-white/40" />
                        </button>
                      </Card>
                    </motion.div>
                  );
                })
              ) : (
                <Card className={cn("p-8 border-dashed flex flex-col items-center text-center gap-3")}>
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-2xl">👶</div>
                  <p className="text-sm font-bold opacity-40">{t('noChildren')}</p>
                </Card>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className={cn("p-6 flex flex-col items-center gap-2 border-2")}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: colors.card, color: colors.primary }}>
              <Book className="w-6 h-6" />
            </div>
            <div className="text-center">
              <p className="text-xs font-bold opacity-40 uppercase tracking-wider" style={{ color: colors.text.secondary }}>{t('stories')}</p>
              <p className="font-black text-2xl" style={{ color: colors.text.primary }}>{stats.total}</p>
            </div>
          </Card>
          <Card className={cn("p-6 flex flex-col items-center gap-2 border-2")}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: colors.card, color: colors.secondary }}>
              <Heart className="w-6 h-6" />
            </div>
            <div className="text-center">
              <p className="text-xs font-bold opacity-40 uppercase tracking-wider" style={{ color: colors.text.secondary }}>{t('favorites')}</p>
              <p className="font-black text-2xl" style={{ color: colors.text.primary }}>{stats.favorites}</p>
            </div>
          </Card>
        </div>

        {/* Subscription */}
        <div 
          className={cn(
            "p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden border-4",
            isPremium 
              ? "border-amber-400/30 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" 
              : "border-white/10 bg-gradient-to-br from-indigo-600 to-purple-700"
          )}
        >
          {/* Premium Background Effects */}
          {isPremium && (
            <>
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl -ml-32 -mb-32" />
            </>
          )}

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div>
            <div className="flex items-center gap-2 mb-1">
              <div className={cn(
                "p-2 rounded-xl",
                isPremium ? "bg-amber-500 text-slate-900" : "bg-white/20 text-white"
              )}>
                <Crown className="w-5 h-5" />
              </div>
              <h4 className={cn(
                "font-black text-2xl tracking-tight",
                isPremium ? "text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200" : "text-white"
              )}>
                {isPremium ? t('premiumTitle') : t('freeTitle')}
              </h4>
            </div>
                <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em]">
                  {isPremium ? t('premiumStatus') : t('freeStatus')}
                </p>
              </div>
              {isPremium && (
                <div className="bg-amber-500/20 border border-amber-500/50 px-4 py-1 rounded-full text-[10px] font-black uppercase text-amber-400 tracking-widest">
                  Active
                </div>
              )}
            </div>

            {!isPremium ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-wider opacity-70">
                      <span>{t('storiesText')}</span>
                      <span>{used} / {freeLimit}</span>
                    </div>
                    <div className="h-2.5 bg-black/30 rounded-full overflow-hidden p-0.5">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-wider opacity-70">
                      <span className="flex items-center gap-1">
                        <PlayCircle className="w-3 h-3" />
                        {t('withPicturesAd')}
                      </span>
                      <span>{profile?.ad_generations_remaining ?? 3} / 3</span>
                    </div>
                    <div className="h-2.5 bg-black/30 rounded-full overflow-hidden p-0.5">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${((profile?.ad_generations_remaining ?? 3) / 3) * 100}%` }}
                        className="h-full bg-purple-400 rounded-full shadow-[0_0_10px_rgba(192,132,252,0.5)]"
                      />
                    </div>
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowUpgradeConfirm(true)}
                  className="w-full py-5 bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-400 text-slate-900 rounded-[1.5rem] font-black text-base shadow-[0_10px_20px_rgba(245,158,11,0.3)] flex items-center justify-center gap-3 border-b-4 border-amber-700"
                >
                  <Sparkles className="w-5 h-5" />
                  {t('upgrade')}
                </motion.button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-white/80 font-bold text-sm leading-relaxed">
                  {t('premiumDescription')}
                </p>
                <div className="flex gap-2">
                  {[t('unlimited'), t('illustrations'), t('speed')].map(tag => (
                    <span key={tag} className="text-[9px] font-black bg-white/10 px-2 py-1 rounded-lg border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Feedback Section (Premium Only) */}
        {isPremium && (
          <Card className={cn("p-6 space-y-4 border-2")}>
            <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h4 className="font-black text-lg" style={{ color: colors.text.primary }}>{t('feedback')}</h4>
            </div>
            
            <AnimatePresence mode="wait">
              {feedbackSent ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="py-8 text-center space-y-2"
                >
                  <div className="w-12 h-12 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <p className="font-black text-green-600">{t('feedbackSuccess')}</p>
                  <p className="text-xs font-bold opacity-40">{t('feedbackSub')}</p>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <Textarea 
                    placeholder={t('feedbackPlaceholder')}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value.slice(0, 500))}
                    className="min-h-[100px] text-sm"
                  />
                  <div className="flex justify-between items-center">
                    <span className={cn(
                      "text-[10px] font-black uppercase tracking-widest",
                      feedback.length > 450 ? "text-red-500" : "opacity-30"
                    )}>
                      {feedback.length} / 500
                    </span>
                    <Button 
                      size="sm"
                      disabled={!feedback.trim() || isSendingFeedback}
                      loading={isSendingFeedback}
                      onClick={handleSendFeedback}
                      className="px-6"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {t('feedback')}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleSignOut}
            className={cn("w-full p-8 flex items-center justify-start gap-4 border-2 rounded-[2.5rem] transition-all duration-300 hover:scale-[1.02]")}
            style={{ 
              color: colors.text.primary,
              backgroundColor: colors.card,
              borderColor: `${colors.primary}20`
            }}
          >
            <LogOut className="w-6 h-6 opacity-40" />
            <span className="font-bold text-lg">{t('signOut')}</span>
          </button>
          <button
            onClick={() => setShowDeleteAccountConfirm(true)}
            className={cn("w-full p-8 flex items-center justify-start gap-4 border-2 rounded-[2.5rem] transition-all duration-300 hover:scale-[1.02]")}
            style={{ 
              color: '#ef4444',
              backgroundColor: colors.card,
              borderColor: `${colors.primary}20`
            }}
          >
            <Trash2 className="w-6 h-6" />
            <span className="font-bold text-lg">{t('deleteAccount')}</span>
          </button>
        </div>
      </main>

      <ChildProfileModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchChildren}
        child={selectedChild}
        userId={profile?.id}
        currentTheme={currentTheme}
      />


      <ConfirmModal
        isOpen={showUpgradeConfirm}
        title={t('upgradeConfirmTitle')}
        message={t('upgradeConfirmMessage')}
        confirmText={t('upgradeConfirmText')}
        cancelText={t('cancelText')}
        variant="primary"
        onConfirm={handleUpgrade}
        onCancel={() => setShowUpgradeConfirm(false)}
        isLoading={isUpgrading}
      />

      <ConfirmModal
        isOpen={showDeleteAccountConfirm}
        title={t('deleteAccountTitle')}
        message={t('deleteAccountMessage')}
        confirmText={t('deleteAccountConfirm')}
        cancelText={t('cancelText')}
        variant="danger"
        onConfirm={handleDeleteAccount}
        onCancel={() => setShowDeleteAccountConfirm(false)}
      />
    </div>
  );
}
