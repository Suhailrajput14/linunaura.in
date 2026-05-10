/*
  # Create store_settings table

  1. New Table
    - `store_settings` - Key-value store for admin settings
      - `id` (uuid, primary key)
      - `key` (text, unique)
      - `value` (text)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Admin-only access (read and write)

  3. Seed Data
    - store_name, contact_email, phone, address
    - free_shipping_threshold, standard_shipping_rate
*/

CREATE TABLE IF NOT EXISTS store_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE store_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can view settings" ON store_settings FOR SELECT
  TO authenticated
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admin can manage settings" ON store_settings FOR ALL
  TO authenticated
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin')
  WITH CHECK ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

INSERT INTO store_settings (key, value) VALUES
  ('store_name', 'Linunaura'),
  ('contact_email', 'hello@linunaura.com'),
  ('phone', '+1 (555) 123-4567'),
  ('address', '123 Luxury Lane, New York, NY'),
  ('free_shipping_threshold', '100'),
  ('standard_shipping_rate', '9.99')
ON CONFLICT (key) DO NOTHING;
