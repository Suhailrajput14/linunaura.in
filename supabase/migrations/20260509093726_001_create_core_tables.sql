/*
  # Create Core Tables for Linunaura Ecommerce

  1. New Tables
    - `categories` - Product categories (Bedsheets, Curtains, Cushions, etc.)
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `slug` (text, unique)
      - `description` (text)
      - `image_url` (text)
      - `created_at` (timestamptz)
    - `products` - Product catalog
      - `id` (uuid, primary key)
      - `name` (text)
      - `slug` (text, unique)
      - `description` (text)
      - `price` (numeric)
      - `compare_price` (numeric, nullable)
      - `category_id` (uuid, FK to categories)
      - `images` (jsonb, array of image URLs)
      - `featured` (boolean)
      - `rating` (numeric)
      - `review_count` (integer)
      - `in_stock` (boolean)
      - `material` (text)
      - `dimensions` (text)
      - `care_instructions` (text)
      - `created_at` (timestamptz)
    - `cart_items` - Shopping cart
      - `id` (uuid, primary key)
      - `user_id` (uuid, FK to auth.users)
      - `product_id` (uuid, FK to products)
      - `quantity` (integer)
      - `created_at` (timestamptz)
    - `wishlist_items` - Wishlist
      - `id` (uuid, primary key)
      - `user_id` (uuid, FK to auth.users)
      - `product_id` (uuid, FK to products)
      - `created_at` (timestamptz)
    - `orders` - Customer orders
      - `id` (uuid, primary key)
      - `user_id` (uuid, FK to auth.users)
      - `status` (text)
      - `total` (numeric)
      - `shipping_address` (jsonb)
      - `payment_method` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    - `order_items` - Items within orders
      - `id` (uuid, primary key)
      - `order_id` (uuid, FK to orders)
      - `product_id` (uuid, FK to products)
      - `quantity` (integer)
      - `price` (numeric)
    - `profiles` - User profiles
      - `id` (uuid, primary key, FK to auth.users)
      - `full_name` (text)
      - `phone` (text)
      - `address` (jsonb)
      - `role` (text, default 'customer')
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Users can only access their own cart, wishlist, orders, profile
    - Admin role can access all data
    - Public read access for products and categories
*/

-- Categories
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  image_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Products
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  price numeric(10,2) NOT NULL DEFAULT 0,
  compare_price numeric(10,2),
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  images jsonb DEFAULT '[]'::jsonb,
  featured boolean DEFAULT false,
  rating numeric(3,2) DEFAULT 0,
  review_count integer DEFAULT 0,
  in_stock boolean DEFAULT true,
  material text DEFAULT '',
  dimensions text DEFAULT '',
  care_instructions text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Cart Items
CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  quantity integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Wishlist Items
CREATE TABLE IF NOT EXISTS wishlist_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Orders
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status text DEFAULT 'pending',
  total numeric(10,2) DEFAULT 0,
  shipping_address jsonb DEFAULT '{}'::jsonb,
  payment_method text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Order Items
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  quantity integer DEFAULT 1,
  price numeric(10,2) DEFAULT 0
);

-- Profiles
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text DEFAULT '',
  phone text DEFAULT '',
  address jsonb DEFAULT '{}'::jsonb,
  role text DEFAULT 'customer',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Categories: public read, admin write
CREATE POLICY "Public can view categories" ON categories FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin can manage categories" ON categories FOR ALL TO authenticated USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Products: public read, admin write
CREATE POLICY "Public can view products" ON products FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin can manage products" ON products FOR ALL TO authenticated USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Cart: users own cart
CREATE POLICY "Users can view own cart" ON cart_items FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can add to own cart" ON cart_items FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own cart" ON cart_items FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own cart" ON cart_items FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Wishlist: users own wishlist
CREATE POLICY "Users can view own wishlist" ON wishlist_items FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can add to own wishlist" ON wishlist_items FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own wishlist" ON wishlist_items FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Orders: users own orders, admin all
CREATE POLICY "Users can view own orders" ON orders FOR SELECT TO authenticated USING (auth.uid() = user_id OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Users can create orders" ON orders FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admin can update orders" ON orders FOR UPDATE TO authenticated USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Order items: via order ownership
CREATE POLICY "Users can view own order items" ON order_items FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND (orders.user_id = auth.uid() OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin')));
CREATE POLICY "Users can create order items" ON order_items FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));

-- Profiles: users own profile, admin all
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT TO authenticated USING (auth.uid() = id OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- Also allow unauthenticated read for products and categories
CREATE POLICY "Unauthenticated can view categories" ON categories FOR SELECT TO anon USING (true);
CREATE POLICY "Unauthenticated can view products" ON products FOR SELECT TO anon USING (true);
