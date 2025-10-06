-- Fix profiles table structure without dropping it
-- Add email column if it doesn't exist
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email TEXT;

-- Update the trigger to include email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email)
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email;
  RETURN new;
END;
$$;

-- Ensure the foreign key constraint is correct
ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_user_id_fkey;
ALTER TABLE orders
ADD CONSTRAINT orders_user_id_fkey
FOREIGN KEY (user_id)
REFERENCES profiles(id)
ON DELETE CASCADE;

-- Update RLS policies to use id instead of user_id
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = id);
