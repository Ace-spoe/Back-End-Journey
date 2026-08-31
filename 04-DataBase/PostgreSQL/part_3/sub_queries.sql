-- ===============
-- SUBQUERIES -  queries nested inside another SQL statement , Postgres runs inner query first then the outer
-- ===============

-- Which posts are performing better than the average ,

SELECT 
    p.title AS title ,
    AVG( p.views) AS avg
FROM posts p
GROUP BY p.title;

SELECT 
    p.title AS post_title,
    p.status AS post_status,
    p.views AS views
FROM posts p
WHERE p.views > (
    SELECT AVG( p.views)   -- this is a sub query
    FROM posts p
);