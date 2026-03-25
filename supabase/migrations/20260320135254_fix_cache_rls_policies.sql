BEGIN;

-- Allow authenticated users to insert into cache tables (since we are using them for shared content)
-- This also fixes the issue when the service_role key is actually an anon key

CREATE POLICY "Authenticated users can insert cached stories" ON public.cached_stories
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update cached stories" ON public.cached_stories
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete cached stories" ON public.cached_stories
    FOR DELETE USING (auth.role() = 'authenticated');


CREATE POLICY "Authenticated users can insert cached text stories" ON public.cached_text_stories
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update cached text stories" ON public.cached_text_stories
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete cached text stories" ON public.cached_text_stories
    FOR DELETE USING (auth.role() = 'authenticated');


CREATE POLICY "Authenticated users can insert user_cached_stories" ON public.user_cached_stories
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert user_cached_text_stories" ON public.user_cached_text_stories
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

COMMIT;
