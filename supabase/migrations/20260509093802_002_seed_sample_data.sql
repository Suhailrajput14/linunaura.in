/*
  # Seed Sample Data for Linunaura

  1. Categories
    - Bedsheets, Curtains, Cushions, Table Linen, Bath Linen, Decor

  2. Products (12 sample products)
    - Premium bedsheets, curtains, cushions, etc. with realistic data
    - Pexels image URLs for product photos

  3. Notes
    - Uses safe INSERT ... ON CONFLICT DO NOTHING
    - All products have realistic pricing, materials, dimensions
*/

-- Insert categories
INSERT INTO categories (name, slug, description, image_url) VALUES
  ('Bedsheets', 'bedsheets', 'Premium cotton and linen bedsheets for luxurious comfort', 'https://images.pexels.com/photos/6207893/pexels-photo-6207893.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Curtains', 'curtains', 'Elegant curtains and drapes for every room', 'https://images.pexels.com/photos/6207893/pexels-photo-6207893.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Cushions', 'cushions', 'Decorative cushions and throw pillows', 'https://images.pexels.com/photos/6207893/pexels-photo-6207893.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Table Linen', 'table-linen', 'Premium tablecloths, runners, and napkins', 'https://images.pexels.com/photos/6207893/pexels-photo-6207893.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Bath Linen', 'bath-linen', 'Luxurious towels and bath accessories', 'https://images.pexels.com/photos/6207893/pexels-photo-6207893.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Decor', 'decor', 'Home decor accents and accessories', 'https://images.pexels.com/photos/6207893/pexels-photo-6207893.jpeg?auto=compress&cs=tinysrgb&w=800')
ON CONFLICT (slug) DO NOTHING;

-- Insert products
INSERT INTO products (name, slug, description, price, compare_price, category_id, images, featured, rating, review_count, in_stock, material, dimensions, care_instructions) VALUES
  ('Egyptian Cotton Sateen Sheet Set', 'egyptian-cotton-sateen-sheet-set', 'Indulge in the silky smoothness of 1000-thread-count Egyptian cotton sateen. This premium sheet set includes a fitted sheet, flat sheet, and two pillowcases, offering unmatched softness and a luminous sheen that elevates your bedroom.', 249.00, 329.00, (SELECT id FROM categories WHERE slug='bedsheets'), '["https://images.pexels.com/photos/6207893/pexels-photo-6207893.jpeg?auto=compress&cs=tinysrgb&w=800","https://images.pexels.com/photos/6207893/pexels-photo-6207893.jpeg?auto=compress&cs=tinysrgb&w=600"]'::jsonb, true, 4.80, 124, true, '100% Egyptian Cotton', 'King: 76"x80"', 'Machine wash cold, tumble dry low'),

  ('Linen Blend Duvet Cover', 'linen-blend-duvet-cover', 'A beautifully textured linen-cotton blend duvet cover that brings effortless sophistication to your bedroom. Pre-washed for ultimate softness with a relaxed, lived-in look.', 189.00, 239.00, (SELECT id FROM categories WHERE slug='bedsheets'), '["https://images.pexels.com/photos/6207893/pexels-photo-6207893.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb, true, 4.60, 89, true, '55% Linen, 45% Cotton', 'Queen: 88"x92"', 'Machine wash gentle cycle'),

  ('Velvet Blackout Curtain Pair', 'velvet-blackout-curtain-pair', 'Rich, plush velvet curtains that block 99% of light while adding dramatic elegance to any room. Thermal-lined for energy efficiency and noise reduction.', 179.00, 229.00, (SELECT id FROM categories WHERE slug='curtains'), '["https://images.pexels.com/photos/6207893/pexels-photo-6207893.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb, true, 4.70, 67, true, '100% Polyester Velvet', '52"x96" per panel', 'Dry clean recommended'),

  ('Sheer Linen Curtain Panel', 'sheer-linen-curtain-panel', 'Light-filtering sheer linen curtains that create an airy, ethereal atmosphere. The natural texture adds warmth while allowing soft daylight to fill your space.', 89.00, NULL, (SELECT id FROM categories WHERE slug='curtains'), '["https://images.pexels.com/photos/6207893/pexels-photo-6207893.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb, false, 4.40, 45, true, '100% Belgian Linen', '50"x108"', 'Machine wash cold, hang dry'),

  ('Silk Embroidered Cushion', 'silk-embroidered-cushion', 'Hand-embroidered silk cushion with intricate botanical motifs. A statement piece that adds artisanal luxury to sofas and armchairs.', 79.00, 99.00, (SELECT id FROM categories WHERE slug='cushions'), '["https://images.pexels.com/photos/6207893/pexels-photo-6207893.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb, true, 4.90, 156, true, '100% Silk Cover', '18"x18"', 'Dry clean only'),

  ('Chunky Knit Throw Pillow', 'chunky-knit-throw-pillow', 'Oversized chunky knit pillow in a cozy, textured design. Made from premium merino wool for a soft, inviting feel that complements any decor style.', 69.00, NULL, (SELECT id FROM categories WHERE slug='cushions'), '["https://images.pexels.com/photos/6207893/pexels-photo-6207893.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb, false, 4.50, 78, true, 'Merino Wool', '20"x20"', 'Hand wash cold, lay flat to dry'),

  ('Damask Tablecloth', 'damask-tablecloth', 'Exquisite damask tablecloth woven with a timeless jacquard pattern. Perfect for formal dining, this heavyweight cloth drapes beautifully and resists wrinkles.', 119.00, 149.00, (SELECT id FROM categories WHERE slug='table-linen'), '["https://images.pexels.com/photos/6207893/pexels-photo-6207893.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb, false, 4.60, 34, true, '100% Cotton Damask', '60"x120"', 'Machine wash warm, iron while damp'),

  ('Linen Table Runner', 'linen-table-runner', 'A refined linen table runner that adds understated elegance to any table setting. The natural slub texture and fringed edges create a relaxed yet polished look.', 49.00, NULL, (SELECT id FROM categories WHERE slug='table-linen'), '["https://images.pexels.com/photos/6207893/pexels-photo-6207893.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb, false, 4.30, 22, true, '100% European Linen', '14"x72"', 'Machine wash cold, tumble dry low'),

  ('Egyptian Cotton Bath Towel Set', 'egyptian-cotton-bath-towel-set', 'Wrap yourself in cloud-like softness with our premium Egyptian cotton towel set. Zero-twist construction ensures exceptional absorbency and a plush, luxurious feel.', 89.00, 119.00, (SELECT id FROM categories WHERE slug='bath-linen'), '["https://images.pexels.com/photos/6207893/pexels-photo-6207893.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb, true, 4.70, 93, true, '100% Egyptian Cotton', 'Bath: 30"x56", Hand: 16"x30", Wash: 13"x13"', 'Machine wash warm, tumble dry low'),

  ('Waffle Robe', 'waffle-robe', 'A lightweight waffle-weave robe that is both absorbent and breathable. Perfect after a bath or shower, with a shawl collar and self-tie belt for a spa-like experience at home.', 129.00, NULL, (SELECT id FROM categories WHERE slug='bath-linen'), '["https://images.pexels.com/photos/6207893/pexels-photo-6207893.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb, false, 4.50, 41, true, '100% Cotton Waffle', 'One Size: 48" length', 'Machine wash cold, tumble dry low'),

  ('Handwoven Rattan Basket Set', 'handwoven-rattan-basket-set', 'Artisan-crafted rattan baskets in three sizes, perfect for stylish storage. Each piece is handwoven by skilled craftspeople, making every set unique.', 69.00, 89.00, (SELECT id FROM categories WHERE slug='decor'), '["https://images.pexels.com/photos/6207893/pexels-photo-6207893.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb, false, 4.40, 29, true, 'Natural Rattan', 'Small: 8"x8", Medium: 10"x10", Large: 12"x12"', 'Wipe with damp cloth'),

  ('Ceramic Vase Collection', 'ceramic-vase-collection', 'A curated set of three minimalist ceramic vases with a matte finish. Their organic shapes and neutral tones complement any interior style from modern to bohemian.', 99.00, 139.00, (SELECT id FROM categories WHERE slug='decor'), '["https://images.pexels.com/photos/6207893/pexels-photo-6207893.jpeg?auto=compress&cs=tinysrgb&w=800"]'::jsonb, true, 4.80, 67, true, 'Stoneware Ceramic', 'Small: 6"H, Medium: 8"H, Large: 10"H', 'Hand wash only')
ON CONFLICT (slug) DO NOTHING;
