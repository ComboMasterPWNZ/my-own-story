BEGIN;

-- Add missing columns to cached_stories
ALTER TABLE public.cached_stories ADD COLUMN IF NOT EXISTS child_age INTEGER;
ALTER TABLE public.cached_stories ADD COLUMN IF NOT EXISTS interests TEXT[];

-- Add missing columns to cached_text_stories
ALTER TABLE public.cached_text_stories ADD COLUMN IF NOT EXISTS child_age INTEGER;
ALTER TABLE public.cached_text_stories ADD COLUMN IF NOT EXISTS interests TEXT[];
ALTER TABLE public.cached_text_stories ADD COLUMN IF NOT EXISTS art_style TEXT;

COMMIT;
