/*
  # Fix User Authentication Schema

  1. Changes
    - Add missing RLS policies for profiles table
    - Ensure profiles table has correct constraints
    - Fix profile creation trigger

  2. Security
    - Enable RLS on profiles table
    - Add policies for profile management
*/

-- Drop existing trigger if it exists
DROP FUNCTION IF EXISTS handle_new_user CASCADE;

-- Create the auth trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, updated_at)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    null,
    now()
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Ensure RLS is enabled
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view profiles" ON public.profiles;

-- Create comprehensive policies
CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can insert own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Add NOT NULL constraint to id column if not already present
ALTER TABLE public.profiles 
  ALTER COLUMN id SET NOT NULL;