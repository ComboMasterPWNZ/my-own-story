BEGIN;

-- Add theme column to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS theme TEXT DEFAULT 'dark';

COMMIT;