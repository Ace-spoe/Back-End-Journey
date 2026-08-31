-- ===========
-- GROUP BY - creates groups of rows , groups rows that have the same value in a column
-- WHERE - used to filter before grouping
-- HAVING - used to filter after grouping , filters the groups
-- Key Rule : Every column in SELECT that is NOT an aggregate function MUST appear in GROUP BY.
-- ===========

-- SELECT 
--     COUNT(*) AS total_products
-- FROM products p
-- WHERE p.category ILIKE 'office';


SELECT t.name AS tag_name ,
        COUNT(DISTINCT p.id) AS total_posts
FROM tags t
LEFT JOIN post_tags pt ON t.id = pt.tag_id
LEFT JOIN posts p ON p.id = pt.post_id
GROUP BY t.id 
ORDER BY total_posts DESC; 




-- SELECT category, COUNT(*)            -- 5. Select columns
-- FROM products                        -- 1. Start with table
-- WHERE price > 10                     -- 2. Filter rows
-- GROUP BY category                    -- 3. Group rows
-- HAVING COUNT(*) > 2                  -- 4. Filter groups
-- ORDER BY category;                   -- 6. Sort results