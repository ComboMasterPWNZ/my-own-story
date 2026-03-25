BEGIN;

-- Add selected_theme column to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS selected_theme TEXT DEFAULT 'Единорожья магия';

COMMIT;