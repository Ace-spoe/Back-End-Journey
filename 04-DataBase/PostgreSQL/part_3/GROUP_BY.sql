-- ===========
-- GROUP BY - creates groups of rows , groups rows that have the same value in a column
-- WHERE - used to filter before grouping
-- HAVING - used to filter after grouping , filters the groups
-- Key Rule : Every column in SELECT that is NOT an aggregate function MUST appear in GROUP BY.
-- ===========

SELECT 
    p.name,
    COUNT(*) AS total_products
FROM products p
WHERE p.category ILIKE 'office';





-- SELECT category, COUNT(*)            -- 5. Select columns
-- FROM products                        -- 1. Start with table
-- WHERE price > 10                     -- 2. Filter rows
-- GROUP BY category                    -- 3. Group rows
-- HAVING COUNT(*) > 2                  -- 4. Filter groups
-- ORDER BY category;                   -- 6. Sort results