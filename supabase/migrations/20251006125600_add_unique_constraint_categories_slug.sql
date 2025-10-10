-- Add unique constraint on categories.slug to prevent duplicates
ALTER TABLE public.categories ADD CONSTRAINT categories_slug_unique UNIQUE (slug);
