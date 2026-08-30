-- ============================================
-- INNER JOIN - RETURNS ONLY THE MATCHING ROWS FROM BOTH TABLES.
-- ============================================

-- SELECT 
--     users.name AS author_name,
--     posts.title AS post_title ,
--     posts.status ,
--     posts.views
-- FROM posts , users
-- WHERE posts.user_id = users.id AND posts.status ILIKE 'public';

-- THE FOLLOWING IS A SIMILAR QUERY BUT WITH JOIN
-- The Benefit: Cleaner separation. ON defines how tables are connected. WHERE defines what rows you want to see.

SELECT 
    users.name AS author_name,
    posts.title AS post_title ,
    posts.status ,
    posts.views
FROM posts
INNER JOIN users
    ON posts.user_id = users.id
WHERE posts.status ILIKE 'public'
ORDER BY posts.views DESC;