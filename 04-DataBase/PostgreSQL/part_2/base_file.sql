CREATE EXTENSION IF NOT EXISTS pgcrypto;

DROP TABLE IF EXISTS products;

CREATE TABLE products(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL ,
    category TEXT NOT NULL ,
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    stock INT NOT NULL DEFAULT 0 CHECK (STOCK >= 0),
    is_active BOOLEAN NOT NULL DEFAULT true ,
    sku TEXT UNIQUE,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);


INSERT INTO products (name, category, price, stock, is_active, sku, description)
VALUES 
    ('Wireless Mouse', 'Electronics', 29.99, 150, true, 'ELEC-MOUSE-001', 'Ergonomic wireless mouse with USB receiver'),
    ('Mechanical Keyboard', 'Electronics', 89.99, 75, true, 'ELEC-KEYB-002', 'RGB backlit mechanical keyboard with blue switches'),
    ('Coffee Mug', 'Kitchen', 12.50, 200, true, 'KITCH-MUG-003', 'Ceramic coffee mug, 12oz, dishwasher safe'),
    ('Yoga Mat', 'Fitness', 24.99, 0, false, 'FIT-MAT-004', 'Non-slip exercise mat, 6mm thick'),
    ('Desk Lamp', 'Office', 39.99, 50, true, 'OFF-LAMP-005', 'LED desk lamp with adjustable brightness'),
    ('Water Bottle', 'Kitchen', 15.99, 100, true, 'KITCH-BOTTLE-006', 'Insulated stainless steel water bottle, 24oz'),
    ('Laptop Stand', 'Office', 49.99, 40, true, 'OFF-STAND-007', 'Adjustable aluminum laptop stand'),
    ('Resistance Bands', 'Fitness', 19.99, 80, true, 'FIT-BAND-008', 'Set of 5 resistance bands with door anchor'),
    ('Notebook', 'Office', 4.99, 500, true, 'OFF-NOTE-009', 'A5 dotted notebook, 100 pages'),
    ('Desk Organizer', 'Office', 22.50, 60, true, 'OFF-ORG-010', 'Multi-compartment desk organizer');

SELECT * -- * return every column
FROM products
WHERE sku IN ('ELEC-MOUSE-001', 'OFF-LAMP-005'); -- Think of IN as multiple OR conditions , you could have done 
-- WHERE sku = 'ELEC-MOUSE-001' OR sku = 'OFF-LAMP-005'; 
-- The || operator in PostgreSQL means string concatenation so it won't work as OR here!

