BEGIN;

-- Add ad-related columns to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS ad_generations_remaining INTEGER DEFAULT 3;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_ad_reset TIMESTAMPTZ DEFAULT NOW();

-- Add parameters_hash and usage tracking to cached_stories
ALTER TABLE public.cached_stories ADD COLUMN IF NOT EXISTS parameters_hash TEXT;
ALTER TABLE public.cached_stories ADD COLUMN IF NOT EXISTS usage_count INTEGER DEFAULT 0;
ALTER TABLE public.cached_stories ADD COLUMN IF NOT EXISTS last_accessed TIMESTAMPTZ DEFAULT NOW();
CREATE INDEX IF NOT EXISTS idx_cached_stories_hash ON public.cached_stories(parameters_hash);

-- Add parameters_hash and usage tracking to cached_text_stories
ALTER TABLE public.cached_text_stories ADD COLUMN IF NOT EXISTS parameters_hash TEXT;
ALTER TABLE public.cached_text_stories ADD COLUMN IF NOT EXISTS usage_count INTEGER DEFAULT 0;
ALTER TABLE public.cached_text_stories ADD COLUMN IF NOT EXISTS last_accessed TIMESTAMPTZ DEFAULT NOW();
CREATE INDEX IF NOT EXISTS idx_cached_text_stories_hash ON public.cached_text_stories(parameters_hash);

COMMIT;
