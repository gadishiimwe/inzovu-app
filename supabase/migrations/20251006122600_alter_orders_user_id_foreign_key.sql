-- Alter orders table to reference profiles.id instead of auth.users.id
-- First drop the existing foreign key constraint
ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_user_id_fkey;

-- Add new foreign key constraint to reference profiles.id
ALTER TABLE orders
ADD CONSTRAINT orders_user_id_fkey
FOREIGN KEY (user_id)
REFERENCES profiles(id)
ON DELETE CASCADE;

-- Recreate the index (it should already exist, but this ensures it's there)
CREATE INDEX IF NOT EXISTS orders_user_id_idx ON orders(user_id);
