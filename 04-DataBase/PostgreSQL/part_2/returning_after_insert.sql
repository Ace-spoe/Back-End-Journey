-- WHILE INSERT
-- INSERT INTO products(name, category, price, stock, is_active, sku, description)
-- VALUES ('Dumbbell Set', 'Fitness', 149.99, 15, true, 'FIT-DUMB-013', 'Pair of adjustable dumbbells, 5-25 lbs each')
-- RETURNING id , name;
-- -- returns the rows immediately after insert , update , delete

-- WHILE UPDATE
-- UPDATE products
-- SET stock = stock + 10
-- WHERE sku = 'FIT-DUMB-013'
-- RETURNING id , name;

-- WHILE DELETE
-- DELETE 
-- FROM products 
-- WHERE sku = 'FIT-DUMB-013'
-- RETURNING id  ,name;