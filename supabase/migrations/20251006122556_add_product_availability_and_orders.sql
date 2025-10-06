-- Add product availability column to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS available BOOLEAN DEFAULT true;

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  items JSONB NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS orders_user_id_idx ON orders(user_id);
CREATE INDEX IF NOT EXISTS orders_status_idx ON orders(status);
CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders(created_at);

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all orders" ON orders
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
