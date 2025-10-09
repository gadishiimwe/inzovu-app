-- Seed initial categories
INSERT INTO public.categories (slug, title, image_url) VALUES
  ('fruits', 'Fruits', '/assets/categories/fruits.jpg'),
  ('vegetables', 'Vegetables', '/assets/categories/vegetables.jpg'),
  ('dairy', 'Dairy & Eggs', '/assets/categories/dairy.jpg'),
  ('bakery', 'Bakery', '/assets/categories/bakery.jpg'),
  ('meat', 'Meat & Poultry', '/assets/categories/meat.jpg'),
  ('pantry', 'Pantry', '/assets/categories/pantry.jpg')
ON CONFLICT (slug) DO NOTHING;

-- Seed initial products
INSERT INTO public.products (name, price, unit, category_slug, image_url, description, available) VALUES
  -- Fruits
  ('Bananas (Ripe)', 2000, '/kg', 'fruits', '/assets/products/bananas.jpg', 'Sweet, ripe bananas perfect for snacking and smoothies.', true),
  ('Avocado (Hass)', 1500, 'each', 'fruits', '/assets/products/avocado.jpg', 'Creamy Hass avocado, great for salads and toast.', true),
  ('Apples (Mixed)', 3000, '/kg', 'fruits', '/assets/products/apples.jpg', 'Fresh crisp apples, red and green varieties.', true),
  ('Oranges (Sweet)', 2500, '/kg', 'fruits', '/assets/products/oranges.jpg', 'Juicy sweet oranges, perfect for fresh juice.', true),
  ('Mangoes (Fresh)', 3500, '/kg', 'fruits', '/assets/products/mangoes.jpg', 'Sweet and juicy mangoes, perfect for desserts.', true),

  -- Vegetables
  ('Spinach (Fresh)', 1500, '/bunch', 'vegetables', '/assets/products/spinach.jpg', 'Fresh organic spinach, perfect for salads.', true),
  ('Tomatoes (Vine)', 2000, '/kg', 'vegetables', '/assets/products/apples.jpg', 'Ripe vine tomatoes, great for cooking.', true),
  ('Carrots (Fresh)', 1800, '/kg', 'vegetables', '/assets/products/apples.jpg', 'Crunchy fresh carrots, perfect for snacking.', true),
  ('Potatoes (White)', 1600, '/kg', 'vegetables', '/assets/products/apples.jpg', 'Fresh white potatoes, versatile for cooking.', true),

  -- Dairy
  ('Milk (Fresh)', 2500, '/liter', 'dairy', '/assets/products/milk.jpg', 'Fresh cow milk, pasteurized and homogenized.', true),
  ('Eggs (Free Range)', 800, '/dozen', 'dairy', '/assets/products/eggs.jpg', 'Farm fresh free-range eggs.', true),
  ('Cheese (Cheddar)', 4500, '/kg', 'dairy', '/assets/products/milk.jpg', 'Aged cheddar cheese, sharp and flavorful.', true),

  -- Bakery
  ('Sourdough Bread', 3000, '/loaf', 'bakery', '/assets/products/sourdough.jpg', 'Artisanal sourdough bread, baked fresh daily.', true),
  ('Croissants (Butter)', 500, '/piece', 'bakery', '/assets/products/sourdough.jpg', 'Flaky butter croissants, golden and delicious.', true),

  -- Meat
  ('Chicken (Whole)', 6000, '/kg', 'meat', '/assets/products/chicken.jpg', 'Fresh whole chicken, farm raised.', true),
  ('Beef (Ground)', 8500, '/kg', 'meat', '/assets/products/chicken.jpg', 'Lean ground beef, perfect for burgers.', true),

  -- Pantry
  ('Olive Oil (Extra Virgin)', 6000, '/500ml', 'pantry', '/assets/products/olive-oil.jpg', 'Premium extra virgin olive oil.', true),
  ('Rice (Basmati)', 3000, '/kg', 'pantry', '/assets/products/olive-oil.jpg', 'Long grain basmati rice, aromatic and fluffy.', true),
  ('Pasta (Spaghetti)', 2000, '/500g', 'pantry', '/assets/products/olive-oil.jpg', 'Classic spaghetti pasta, al dente perfection.', true)
ON CONFLICT DO NOTHING;

-- Add email column to profiles if it doesn't exist
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email TEXT;

-- Update profiles to include email from auth.users
-- Note: This would normally be done through triggers, but for seeding we'll add some sample profiles
-- In a real app, profiles are created automatically via trigger when users sign up

-- Create a sample admin user profile (this would normally be created when user signs up)
-- Note: This is just for seeding - in production, profiles are auto-created
