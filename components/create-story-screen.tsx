'use client';

import { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ChevronRight, 
  Sparkles, 
  User, 
  Plus, 
  PlayCircle,
  Rocket,
  Crown,
  Bot,
  PawPrint,
  Zap,
  Anchor,
  Heart,
  Shield,
  Users,
  Scale,
  Search,
  Palette,
  Smile,
  Book,
  Wand2,
  Sword,
  Footprints
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { ChildProfile } from '@/lib/types';
import { ThemeConfig } from '@/lib/themes';
import Image from 'next/image';
import { ThemedButton } from './ui/themed-button';
import { ThemedChip } from './ui/themed-chip';
import { ThemedCard } from './ui/themed-card';
import { ChildProfileModal } from './child-profile-modal';
import { MagicButton } from './ui/magic-button';
import { useToast } from '@/context/toast-context';
import { useTranslations } from 'next-intl';

interface CreateStoryScreenProps {
  profile: any;
  currentTheme: ThemeConfig;
  onBack: () => void;
  onComplete: (id: string) => void;
  onStartLoading: () => void;
}

const INTERESTS = [
  { id: "Динозавры", icon: Footprints, labelKey: "dinosaurs" },
  { id: "Космос", icon: Rocket, labelKey: "space" },
  { id: "Принцессы", icon: Crown, labelKey: "princesses" },
  { id: "Роботы", icon: Bot, labelKey: "robots" },
  { id: "Животные", icon: PawPrint, labelKey: "animals" },
  { id: "Супергерои", icon: Zap, labelKey: "superheroes" },
  { id: "Феи", icon: Sparkles, labelKey: "fairies" },
  { id: "Пираты", icon: Anchor, labelKey: "pirates" }
];

const MORALS = [
  { id: "Доброта", icon: Heart, labelKey: "kindness" },
  { id: "Смелость", icon: Shield, labelKey: "courage" },
  { id: "Дружба", icon: Users, labelKey: "friendship" },
  { id: "Честность", icon: Scale, labelKey: "honesty" },
  { id: "Любознательность", icon: Search, labelKey: "curiosity" }
];

const STYLES = [
  { id: "Акварельный", icon: Palette, labelKey: "watercolor" },
  { id: "Мультяшный", icon: Smile, labelKey: "cartoon" },
  { id: "Классическая книга", icon: Book, labelKey: "classic" },
  { id: "Сказочный", icon: Wand2, labelKey: "fairy" },
  { id: "Фэнтези", icon: Sword, labelKey: "fantasy" }
];

export function CreateStoryScreen({ profile, currentTheme, onBack, onComplete, onStartLoading }: CreateStoryScreenProps) {
  const { showToast } = useToast();
  const t = useTranslations('Create');
  const tInterests = useTranslations('Interests');
  const tMorals = useTranslations('Morals');
  const tStyles = useTranslations('Styles');
  const tChildModal = useTranslations('ChildModal');
  const [step, setStep] = useState(1);
  const [children, setChildren] = useState<ChildProfile[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    child_id: '',
    interests: [] as string[],
    moral_theme: '',
    art_style: '',
    useAd: false
  });

  const supabase = createClient();

  const fetchChildren = async () => {
    if (!profile?.id) return;
    const { data } = await supabase
      .from('child_profiles')
      .select('*')
      .eq('user_id', profile.id);
    if (data) setChildren(data);
  };

  useEffect(() => {
    fetchChildren();
  }, [profile?.id, supabase]);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => step > 1 ? setStep(s => s - 1) : onBack();

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleGenerate = async () => {
    onStartLoading();
    
    try {
      const response = await fetch('/api/generate-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate story');
      }

      const { storyId } = await response.json();
      onComplete(storyId);
    } catch (error: any) {
      showToast(error.message, 'error');
      onBack(); // Go back to form if failed
    }
  };

  const selectedChild = children.find(c => c.id === formData.child_id);

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: currentTheme.colors.background }}>
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Progress Bar moved inside main */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: `${currentTheme.colors.text}20` }}>
            <motion.div 
              className="h-full"
              style={{ backgroundColor: currentTheme.colors.primary }}
              initial={{ width: '0%' }}
              animate={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
          <span className="text-xs font-black opacity-40" style={{ color: currentTheme.colors.text }}>{step}/5</span>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-3xl font-black" style={{ color: currentTheme.colors.text }}>{t('whoIsHero')}</h2>
                <p className="opacity-60 font-medium" style={{ color: currentTheme.colors.text }}>{t('whoIsHeroSub')}</p>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <AnimatePresence mode="popLayout">
                  {children.map((child, index) => (
                    <motion.button
                      key={child.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setFormData({ ...formData, child_id: child.id })}
                      className="text-left group"
                    >
                      <ThemedCard 
                        className={cn(
                          "p-5 flex items-center gap-5 transition-all border-4",
                          formData.child_id === child.id
                            ? "border-opacity-100"
                            : "border-opacity-0"
                        )}
                        style={{
                          borderColor: formData.child_id === child.id ? currentTheme.colors.primary : 'transparent'
                        }}
                      >
                        <div 
                          className={cn(
                            "w-16 h-16 rounded-full overflow-hidden relative flex items-center justify-center border-4 transition-colors",
                            formData.child_id === child.id ? "border-opacity-100" : "border-opacity-20"
                          )}
                          style={{ 
                            borderColor: currentTheme.colors.primary,
                            backgroundColor: !child.avatar_url ? `${currentTheme.colors.primary}20` : 'transparent' 
                          }}
                        >
                          {child.avatar_url ? (
                            <Image src={child.avatar_url} alt={child.name} fill className="object-cover" />
                          ) : (
                            <span className="text-2xl font-black uppercase" style={{ color: currentTheme.colors.primary }}>
                              {child.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-black text-xl">{child.name}</p>
                          <p className="text-sm font-bold opacity-40 uppercase tracking-wider">
                            {child.age} {child.age === 1 ? tChildModal('ageYear') : child.age < 5 ? tChildModal('ageYears') : tChildModal('ageYears5')}
                          </p>
                        </div>
                        {formData.child_id === child.id && (
                          <motion.div 
                            layoutId="selected-check"
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: currentTheme.colors.primary }}
                          >
                            <Sparkles className="w-4 h-4" style={{ color: currentTheme.isDark ? '#000' : '#fff' }} />
                          </motion.div>
                        )}
                      </ThemedCard>
                    </motion.button>
                  ))}
                </AnimatePresence>
                
                <div className="flex justify-center pt-4">
                  <motion.button 
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsModalOpen(true)}
                    className="w-16 h-16 rounded-full flex items-center justify-center transition-colors shadow-sm border-4 border-dashed"
                    style={{ 
                      backgroundColor: `${currentTheme.colors.card}50`,
                      borderColor: `${currentTheme.colors.primary}40`,
                      color: currentTheme.colors.primary
                    }}
                  >
                    <Plus className="w-8 h-8" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" className="space-y-6">
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-3xl font-black" style={{ color: currentTheme.colors.text }}>{t('interests')}</h2>
                <p className="opacity-60 font-medium" style={{ color: currentTheme.colors.text }}>{t('interestsSub')}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {INTERESTS.map(item => (
                  <ThemedChip
                    key={item.id}
                    theme={currentTheme}
                    active={formData.interests.includes(item.id)}
                    onClick={() => toggleInterest(item.id)}
                    className="h-24 flex-col gap-1"
                  >
                    <item.icon className="w-8 h-8 mb-1" />
                    <span className="text-xs font-black uppercase tracking-tighter">{tInterests(item.labelKey)}</span>
                  </ThemedChip>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" className="space-y-6">
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-3xl font-black" style={{ color: currentTheme.colors.text }}>{t('moral')}</h2>
                <p className="opacity-60 font-medium" style={{ color: currentTheme.colors.text }}>{t('moralSub')}</p>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {MORALS.map(item => (
                  <ThemedChip
                    key={item.id}
                    theme={currentTheme}
                    active={formData.moral_theme === item.id}
                    onClick={() => setFormData({ ...formData, moral_theme: item.id })}
                    className="h-16 justify-start px-6"
                  >
                    <item.icon className="w-6 h-6" />
                    <span className="font-black">{tMorals(item.labelKey)}</span>
                  </ThemedChip>
                ))}
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" className="space-y-6">
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-3xl font-black" style={{ color: currentTheme.colors.text }}>{t('style')}</h2>
                <p className="opacity-60 font-medium" style={{ color: currentTheme.colors.text }}>{t('styleSub')}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {STYLES.map(item => (
                  <ThemedChip
                    key={item.id}
                    theme={currentTheme}
                    active={formData.art_style === item.id}
                    onClick={() => setFormData({ ...formData, art_style: item.id })}
                    className="h-24 flex-col gap-1"
                  >
                    <item.icon className="w-8 h-8 mb-1" />
                    <span className="text-xs font-black uppercase tracking-tighter">{tStyles(item.labelKey)}</span>
                  </ThemedChip>
                ))}
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div 
              key="step5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-3xl font-black" style={{ color: currentTheme.colors.text }}>{t('ready')}</h2>
                <p className="opacity-60 font-medium" style={{ color: currentTheme.colors.text }}>{t('readySub')}</p>
              </div>

              <ThemedCard theme={currentTheme} className="p-8 border-4 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Sparkles className="w-24 h-24" style={{ color: currentTheme.colors.primary }} />
                </div>
                
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: `${currentTheme.colors.text}10` }}>
                    <span className="opacity-40 font-bold uppercase text-[10px] tracking-widest">{t('summaryHero')}</span>
                    <span className="font-black text-lg" style={{ color: currentTheme.colors.primary }}>{selectedChild?.name}</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: `${currentTheme.colors.text}10` }}>
                    <span className="opacity-40 font-bold uppercase text-[10px] tracking-widest">{t('summaryInterests')}</span>
                    <span className="font-black text-right max-w-[180px]">{formData.interests.map(interest => {
                      const item = INTERESTS.find(i => i.id === interest);
                      return item ? tInterests(item.labelKey) : interest;
                    }).join(', ')}</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: `${currentTheme.colors.text}10` }}>
                    <span className="opacity-40 font-bold uppercase text-[10px] tracking-widest">{t('summaryMoral')}</span>
                    <span className="font-black">{(() => {
                      const item = MORALS.find(m => m.id === formData.moral_theme);
                      return item ? tMorals(item.labelKey) : formData.moral_theme;
                    })()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="opacity-40 font-bold uppercase text-[10px] tracking-widest">{t('summaryStyle')}</span>
                    <span className="font-black">{(() => {
                      const item = STYLES.find(s => s.id === formData.art_style);
                      return item ? tStyles(item.labelKey) : formData.art_style;
                    })()}</span>
                  </div>
                </div>
              </ThemedCard>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="p-6 bg-transparent backdrop-blur-md border-t" style={{ borderColor: `${currentTheme.colors.text}10` }}>
        <div className="flex gap-3">
          {step > 1 && (
            <ThemedButton 
              theme={currentTheme}
              variant="ghost"
              onClick={prevStep}
              className="px-6 py-6"
            >
              <ArrowLeft className="w-6 h-6" />
            </ThemedButton>
          )}
          {step < 5 ? (
            <ThemedButton 
              theme={currentTheme}
              onClick={nextStep}
              disabled={
                (step === 1 && !formData.child_id) ||
                (step === 2 && formData.interests.length === 0) ||
                (step === 3 && !formData.moral_theme) ||
                (step === 4 && !formData.art_style)
              }
              className="flex-1 py-6 text-xl"
            >
              {t('next')}
              <ChevronRight className="w-6 h-6 ml-2" />
            </ThemedButton>
          ) : (
            <motion.div
              className="flex-1"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
        >
          <MagicButton 
            onClick={handleGenerate}
            className="w-full py-8 shadow-xl"
          >
            {t('finish')}
          </MagicButton>
        </motion.div>
          )}
        </div>
      </footer>

      <ChildProfileModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchChildren}
        userId={profile?.id}
        currentTheme={currentTheme}
      />
    </div>
  );
}
