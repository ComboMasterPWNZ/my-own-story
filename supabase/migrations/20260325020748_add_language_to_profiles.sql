-- Добавляем поле language в таблицу profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'ru';

-- Создаём индекс для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_profiles_language ON public.profiles(language);