'use client';

import { useUITheme } from '@/context/UIThemeContext';
import { ThemedButton } from '@/components/ui/themed-button';
import { ThemedCard } from '@/components/ui/themed-card';
import { ThemedChip } from '@/components/ui/themed-chip';
import { ThemedInput } from '@/components/ui/themed-input';

export function TestAppearance() {
  const { currentTheme, currentThemeId, colorMode, temperature, setTemperature, setTheme } = useUITheme();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Тестирование новой системы тем</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ThemedCard>
          <h2 className="text-xl font-bold mb-4">Информация о текущей теме</h2>
          <div className="space-y-2">
            <p><strong>ID темы:</strong> {currentThemeId}</p>
            <p><strong>Название:</strong> {currentTheme.name}</p>
            <p><strong>Описание:</strong> {currentTheme.description}</p>
            <p><strong>Режим:</strong> {colorMode}</p>
            <p><strong>Температура:</strong> {Math.round(temperature * 100)}%</p>
          </div>
        </ThemedCard>

        <ThemedCard>
          <h2 className="text-xl font-bold mb-4">Управление темой</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Температура (интенсивность)</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm">
                <span>Спокойно</span>
                <span>Волшебно</span>
              </div>
            </div>

            <div>
              <label className="block mb-2">Выбор темы</label>
              <div className="flex flex-wrap gap-2">
                {['candy', 'ocean', 'forest', 'space', 'rainbow'].map((themeId) => (
                  <ThemedChip
                    key={themeId}
                    active={currentThemeId === themeId}
                    onClick={() => setTheme(themeId as any)}
                  >
                    {themeId}
                  </ThemedChip>
                ))}
              </div>
            </div>
          </div>
        </ThemedCard>
      </div>

      <ThemedCard>
        <h2 className="text-xl font-bold mb-4">Тестовые компоненты</h2>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <ThemedButton variant="primary">Основная кнопка</ThemedButton>
            <ThemedButton variant="secondary">Вторичная кнопка</ThemedButton>
            <ThemedButton variant="outline">Контурная кнопка</ThemedButton>
            <ThemedButton variant="ghost">Призрачная кнопка</ThemedButton>
            <ThemedButton variant="danger">Опасная кнопка</ThemedButton>
          </div>

          <div className="flex flex-wrap gap-4">
            <ThemedChip active={true}>Активный чип</ThemedChip>
            <ThemedChip active={false}>Неактивный чип</ThemedChip>
          </div>

          <div className="max-w-md">
            <ThemedInput label="Тестовое поле ввода" placeholder="Введите текст..." />
          </div>
        </div>
      </ThemedCard>

      <ThemedCard>
        <h2 className="text-xl font-bold mb-4">Плавающие элементы</h2>
        <p>Плавающие элементы отображаются на фоне всей страницы. В текущей теме используются:</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {currentTheme.background.animations.floatingElements?.map((emoji, index) => (
            <span key={index} className="text-2xl">{emoji}</span>
          ))}
        </div>
      </ThemedCard>
    </div>
  );
}
