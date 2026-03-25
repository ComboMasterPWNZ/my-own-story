-- Add language column to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'ru';

-- Add comment for documentation
COMMENT ON COLUMN public.profiles.language IS 'User interface language preference';