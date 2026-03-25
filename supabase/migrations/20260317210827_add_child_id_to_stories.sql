BEGIN;

-- Add child_id to stories table to link stories to specific children
ALTER TABLE public.stories ADD COLUMN IF NOT EXISTS child_id UUID REFERENCES public.child_profiles(id) ON DELETE SET NULL;

-- Create index for faster filtering
CREATE INDEX IF NOT EXISTS idx_stories_child_id ON public.stories(child_id);

COMMIT;
