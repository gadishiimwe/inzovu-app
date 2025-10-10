-- Add product flags for page management
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_new BOOLEAN DEFAULT false;
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_deal BOOLEAN DEFAULT false;

-- Update some products to have flags for demo purposes
UPDATE products SET is_new = true WHERE name IN ('Bananas (Ripe)', 'Avocado (Hass)', 'Mangoes (Fresh)');
UPDATE products SET is_featured = true WHERE name IN ('Milk (Fresh)', 'Sourdough Bread', 'Chicken (Whole)', 'Olive Oil (Extra Virgin)');
UPDATE products SET is_deal = true WHERE name IN ('Apples (Mixed)', 'Eggs (Free Range)', 'Croissants (Butter)', 'Beef (Ground)');
