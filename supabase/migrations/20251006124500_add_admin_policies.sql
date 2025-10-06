-- Add admin policies for tables to allow admin users to read/write all data

-- Products table admin policies
DROP POLICY IF EXISTS "Admins can manage all products" ON public.products;
CREATE POLICY "Admins can manage all products"
ON public.products
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  )
  OR (auth.jwt() ->> 'email') = 'admin@gmail.com'
);

-- Categories table admin policies
DROP POLICY IF EXISTS "Admins can manage all categories" ON public.categories;
CREATE POLICY "Admins can manage all categories"
ON public.categories
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  )
  OR (auth.jwt() ->> 'email') = 'admin@gmail.com'
);

-- Orders table admin policies
DROP POLICY IF EXISTS "Admins can manage all orders" ON public.orders;
CREATE POLICY "Admins can manage all orders"
ON public.orders
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  )
  OR (auth.jwt() ->> 'email') = 'admin@gmail.com'
);

-- Profiles table admin policies (already exist, but ensure they work)
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  )
  OR (auth.jwt() ->> 'email') = 'admin@gmail.com'
);
