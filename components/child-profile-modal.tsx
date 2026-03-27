'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ChevronDown, ChevronUp, Loader2, Trash2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { ChildProfile, Gender, HairColor, HairLength, EyeColor, Appearance } from '@/lib/types';
import Image from 'next/image';
import { Modal } from './ui/modal';
import { ThemedButton } from './ui/themed-button';
import { ThemedInput } from './ui/themed-input';
import { ThemedChip } from './ui/themed-chip';
import { useToast } from '@/context/toast-context';
import { ConfirmModal } from './ui/confirm-modal';
import { useTranslations } from 'next-intl';
import { useUITheme } from '@/context/UIThemeContext';

interface ChildProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  child?: ChildProfile;
  userId: string;
  currentTheme?: any;
}

export function ChildProfileModal({ isOpen, onClose, onSuccess, child, userId, currentTheme }: ChildProfileModalProps) {
  const { currentTheme: uiTheme, colorMode } = useUITheme();
  const theme = currentTheme || uiTheme;
  const colors = theme.colors[colorMode];
  const { showToast } = useToast();
  const t = useTranslations('ChildModal');
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showAppearance, setShowAppearance] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    age: 5,
    avatar_url: '',
  });

  // 1. Локальное состояние для временных значений внешности
  const [tempAppearance, setTempAppearance] = useState<Appearance>({
    gender: 'boy',
    hair_color: 'brown',
    hair_length: 'short',
    eye_color: 'brown',
  });

  useEffect(() => {
    if (isOpen) {
      if (child) {
        const appearance = (child.appearance as Appearance) || {};
        setFormData({
          name: child.name,
          age: child.age,
          avatar_url: child.avatar_url || '',
        });
        // Инициализируем временную внешность данными ребенка
        setTempAppearance({
          gender: (appearance.gender as Gender) || 'boy',
          hair_color: (appearance.hair_color as HairColor) || 'brown',
          hair_length: (appearance.hair_length as HairLength) || 'short',
          eye_color: (appearance.eye_color as EyeColor) || 'brown',
        });
      } else {
        setFormData({ name: '', age: 5, avatar_url: '' });
        setTempAppearance({
          gender: 'boy',
          hair_color: 'brown',
          hair_length: 'short',
          eye_color: 'brown',
        });
      }
    }
  }, [child, isOpen]);

  const handleDelete = async () => {
    if (!child) return;

    setDeleting(true);
    try {
      const response = await fetch(`/api/children/${child.id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Не удалось удалить профиль');
      showToast('Профиль героя удален', 'success');
      onSuccess();
      onClose();
    } catch (error: any) {
      showToast(error.message, 'error');
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) return;

      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${userId}/${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('children')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('children')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, avatar_url: publicUrl }));
      showToast('Фото успешно загружено', 'success');
    } catch (error: any) {
      showToast('Ошибка загрузки фото: ' + error.message, 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('handleSubmit вызван, отправляю на сервер', { formData, tempAppearance });
    setLoading(true);

    try {
      const url = child ? `/api/children/${child.id}` : '/api/children';
      const method = child ? 'PUT' : 'POST';

      const payload = {
        name: formData.name,
        age: formData.age,
        avatar_url: formData.avatar_url,
        appearance: tempAppearance
      };
      console.log('Payload для сохранения:', payload);

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Не удалось сохранить профиль');
      console.log('Профиль успешно сохранен');

      showToast(child ? 'Профиль обновлен' : 'Герой создан!', 'success');
      onSuccess();
      onClose();
    } catch (error: any) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={child ? t('titleEdit') : t('titleNew')}
        description={t('description')}
        className="border-none"
        style={{ backgroundColor: theme.colors.background }}
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <div 
                className="w-32 h-32 rounded-full overflow-hidden border-4 flex items-center justify-center relative transition-all duration-500"
                style={{ 
                  borderColor: theme.colors.primary,
                  backgroundColor: !formData.avatar_url ? `${theme.colors.primary}10` : 'transparent'
                }}
              >
                {formData.avatar_url ? (
                  <Image src={formData.avatar_url} alt="Avatar" fill className="object-cover" />
                ) : (
                  <div className="flex flex-col items-center">
                    {formData.name ? (
                      <span className="text-5xl font-black uppercase" style={{ color: theme.colors.primary }}>
                        {formData.name.charAt(0)}
                      </span>
                    ) : (
                      <Camera className="w-12 h-12 opacity-20" style={{ color: theme.colors.text }} />
                    )}
                  </div>
                )}
                {uploading && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  </div>
                )}
              </div>
              <label 
                className="absolute bottom-0 right-0 p-3 rounded-full cursor-pointer transition-all shadow-xl hover:scale-110 active:scale-90"
                style={{ backgroundColor: theme.colors.primary }}
              >
                <Camera className="w-5 h-5" style={{ color: theme.isDark ? '#000' : '#fff' }} />
                <input type="file" className="hidden" accept="image/*" onChange={handleAvatarUpload} disabled={uploading} />
              </label>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ThemedInput
              label={t('nameLabel')}
              required
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder={t('namePlaceholder')}
            />
            <div className="space-y-2">
              <label className="text-sm font-bold ml-2 opacity-60" style={{ color: theme.colors.text }}>{t('age')} ({formData.age})</label>
              <input
                type="range" min="2" max="10" step="1"
                value={formData.age}
                onChange={e => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer mt-6"
                style={{ backgroundColor: `${theme.colors.primary}20`, accentColor: theme.colors.primary }}
              />
            </div>
          </div>

          {/* Appearance Collapsible */}
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => setShowAppearance(!showAppearance)}
              className="w-full flex items-center justify-between p-6 rounded-[2rem] border-2 transition-all"
              style={{ 
                backgroundColor: theme.colors.card,
                borderColor: `${theme.colors.primary}20`,
                color: theme.colors.text
              }}
            >
              <span className="text-lg font-black">✨ {t('appearance')}</span>
              {showAppearance ? <ChevronUp /> : <ChevronDown />}
            </button>

            <AnimatePresence>
              {showAppearance && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="p-6 rounded-[2rem] border-2 space-y-6" style={{ backgroundColor: theme.colors.card, borderColor: `${theme.colors.primary}20` }}>
                    {/* Gender */}
                    <div className="space-y-3">
                      <label className="opacity-40 text-xs font-black uppercase" style={{ color: theme.colors.text }}>{t('gender')}</label>
                      <div className="grid grid-cols-2 gap-3">
                        {(['boy', 'girl'] as Gender[]).map(g => (
                          <ThemedChip 
                            key={g} 
                            active={tempAppearance.gender === g} 
                            onClick={() => {
                              console.log('Чипс клик (пол), обновляю tempAppearance:', g);
                              setTempAppearance(p => ({ ...p, gender: g }));
                            }}
                          >
                            {g === 'boy' ? t('boy') : t('girl')}
                          </ThemedChip>
                        ))}
                      </div>
                    </div>

                    {/* Hair Color */}
                    <div className="space-y-3">
                      <label className="opacity-40 text-xs font-black uppercase" style={{ color: theme.colors.text }}>{t('hairColor')}</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {['blond', 'brown', 'red', 'dark'].map(h => (
                          <ThemedChip 
                            key={h} 
                            active={tempAppearance.hair_color === h} 
                            onClick={() => {
                              console.log('Чипс клик (цвет волос), обновляю tempAppearance:', h);
                              setTempAppearance(p => ({ ...p, hair_color: h as HairColor }));
                            }} 
                            className="text-xs"
                          >
                            {h === 'blond' ? t('blond') : h === 'brown' ? t('brown') : h === 'red' ? t('red') : t('dark')}
                          </ThemedChip>
                        ))}
                      </div>
                    </div>

                    {/* Hair Length */}
                    <div className="space-y-3">
                      <label className="opacity-40 text-xs font-black uppercase" style={{ color: theme.colors.text }}>{t('hairLength')}</label>
                      <div className="grid grid-cols-3 gap-3">
                        {['short', 'medium', 'long'].map(l => (
                          <ThemedChip key={l} active={tempAppearance.hair_length === l} onClick={() => setTempAppearance(p => ({ ...p, hair_length: l as HairLength }))} className="text-[10px]">
                            {l === 'short' ? t('short') : l === 'medium' ? t('medium') : t('long')}
                          </ThemedChip>
                        ))}
                      </div>
                    </div>

                    {/* Eye Color */}
                    <div className="space-y-3">
                      <label className="opacity-40 text-xs font-black uppercase" style={{ color: theme.colors.text }}>{t('eyeColor')}</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {['blue', 'green', 'brown', 'grey'].map(e => (
                          <ThemedChip key={e} active={tempAppearance.eye_color === e} onClick={() => setTempAppearance(p => ({ ...p, eye_color: e as EyeColor }))} className="text-xs">
                            {e === 'blue' ? t('blue') : e === 'green' ? t('green') : e === 'brown' ? t('brownEyes') : t('grey')}
                          </ThemedChip>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-6">
            <div className="flex gap-3">
              <ThemedButton type="button" variant="outline" onClick={onClose} className="flex-1 py-6">
                {t('cancel')}
              </ThemedButton>
              <ThemedButton type="submit" loading={loading} disabled={uploading || deleting} className="flex-[2] py-6 text-xl">
                {child ? t('update') : t('create')}
              </ThemedButton>
            </div>

            {child && (
              <div className="pt-6 border-t border-dashed" style={{ borderColor: `${theme.colors.text}20` }}>
                <ThemedButton
                  type="button"
                  variant="danger"
                  onClick={() => setShowDeleteConfirm(true)}
                  loading={deleting}
                  disabled={loading || uploading}
                  className="w-full py-4 text-xs font-black tracking-widest"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {t('deleteHero')}
                </ThemedButton>
              </div>
            )}
          </div>
        </form>
      </Modal>

      <ConfirmModal
        isOpen={showDeleteConfirm}
        title={t('deleteTitle')}
        message={t('deleteMessage', { name: formData.name })}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
        isLoading={deleting}
      />
    </>
  );
}
