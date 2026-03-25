BEGIN;

-- Create storage bucket for children avatars if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('children', 'children', true)
ON CONFLICT (id) DO NOTHING;

-- Set up access control for the bucket
-- Allow public read access to avatars
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'children');

-- Allow authenticated users to upload to their own folder
CREATE POLICY "Authenticated users can upload avatars" ON storage.objects 
    FOR INSERT 
    WITH CHECK (bucket_id = 'children' AND auth.role() = 'authenticated');

-- Allow users to update/delete their own files (assuming folder name is user_id)
CREATE POLICY "Users can update their own avatars" ON storage.objects 
    FOR UPDATE 
    USING (bucket_id = 'children' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can delete their own avatars" ON storage.objects 
    FOR DELETE 
    USING (bucket_id = 'children' AND (storage.foldername(name))[1] = auth.uid()::text);

COMMIT;
