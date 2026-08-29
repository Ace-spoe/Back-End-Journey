        -- UPDATE A SINGLE ROW

-- SELECT name , price , stock , sku
-- FROM products
-- WHERE sku = 'ELEC-MOUSE-001';

-- UPDATE products
-- SET price = 120.50, stock = 23
-- WHERE sku = 'ELEC-MOUSE-001';

-- SELECT name , price , stock , sku
-- FROM products
-- WHERE sku = 'ELEC-MOUSE-001';


        -- UPDATE MULTIPLE ROWS

-- SELECT name , category , price , is_active
-- FROM products
-- WHERE category ILIKE 'office';

-- UPDATE products
-- SET price = ROUND(price * 1.10 , 2) -- ROUND(value, decimals) takes a number and rounds it to the number of decimal places you specify.
-- WHERE category ILIKE 'office';

-- SELECT name , category , price , is_active
-- FROM products
-- WHERE category ILIKE 'office';


-- isactive example
-- SELECT name , stock , is_active
-- FROM products;

-- UPDATE products
-- SET is_active = FALSE
-- WHERE stock = 0;

-- SELECT name , stock , is_active
-- FROM products;



