-- =========
-- Calculating a result from many rows
-- AGGREGATE FUNCTIONS
-- COUNT() - nmber of rows
-- COUNT(column_name) — Count non-NULL values in a column
-- COUNT(DISTINCT column_name) — Count unique values
-- COUNT(*) FILTER (WHERE condition)
-- SUM() , AVG() , MAX() , MIN()
--  STRING_AGG() — Joins text values together 
    /*
    SELECT STRING_AGG(name, ', ') FROM tags; Result: SQL, PostgreSQL, Tutorial
    */
-- ARRAY_AGG() — Collects values into an array
-- =========

SELECT
    COUNT(*) AS total_posts ,
    COUNT(*) FILTER (WHERE p.status ILIKE 'public') AS published_posts,
    SUM(views) AS total_views ,
    ROUND( AVG(views) , 2 ) AS avg_view ,
    MAX(views) AS max_viewed,
    MIN(views) AS min_viewed
FROM posts p;

SELECT
    COUNT(*) AS published_posts
FROM posts p
WHERE p.status ILIKE 'public';
