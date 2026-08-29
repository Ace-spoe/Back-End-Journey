-- /products?category=electronics

-- SELECT name , category , price 
-- FROM products
-- WHERE category = 'electronics';

-- SELECT name , category , price 
-- FROM products
-- WHERE price > 200;

-- SELECT name , is_active 
-- FROM products
-- WHERE is_active = FALSE;


--- AND , OR , NOT FILTERS

-- SELECT name , price , category
-- FROM products
-- WHERE price > 30 AND category = 'Electronics';

-- OR

-- SELECT name , price , category
-- FROM products
-- WHERE category = 'Electronics' OR category = 'Fitness';

-- NOT

-- SELECT name , price , category
-- FROM products
-- WHERE NOT category = 'Electronics';

-- Combination
-- SELECT name , price , category
-- FROM products
-- WHERE (category = 'Electronics' OR category = 'Fitness') 
-- AND  price > 29;

-- PATTERN MATCHING
-- LIKE - Case sensetive pattern match 
-- ILIKE - Case Insensetive pattern match
-- % means any number of characters

--LIKE 
    -- SELECT name , category , price 
    -- FROM products
    -- WHERE name LIKE 'Wireless%' ;

-- ILIKE 
    -- SELECT name , category , price 
    -- FROM products
    -- WHERE name ILIKE '%dEsk%' ;

-- Combination of ILIKE & OR
    -- SELECT name , category , price 
    -- FROM products
    -- WHERE name ILIKE '%laMp%' OR description ILIKE '%LAMP%' ;


-- IN - values must match one item from the list
-- NOT IN - values must NOT match one item from the list
-- BETWEEN - value must be between a range

-- SELECT name , price , category
-- FROM products
-- WHERE category NOT IN ('Electronics','Fitness');

-- BETWEEN
-- SELECT name , price , category
-- FROM products
-- WHERE price BETWEEN 20 AND 80; -- its like price >= 20 AND price <= 80 , inclusive

-- IS NOT NULL : when you want to check if a value is not null you don't use `value = NULL` rather `value IS NULL` 

-- SELECT name , price , category , description
-- FROM products
-- WHERE description IS NULL;

