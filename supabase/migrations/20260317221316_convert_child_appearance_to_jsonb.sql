BEGIN;

-- Remove individual columns
ALTER TABLE public.child_profiles DROP COLUMN IF EXISTS gender;
ALTER TABLE public.child_profiles DROP COLUMN IF EXISTS hair_color;
ALTER TABLE public.child_profiles DROP COLUMN IF EXISTS hair_length;
ALTER TABLE public.child_profiles DROP COLUMN IF EXISTS eye_color;

-- Add appearance JSONB column
ALTER TABLE public.child_profiles ADD COLUMN appearance JSONB DEFAULT '{}'::jsonb;

COMMIT;