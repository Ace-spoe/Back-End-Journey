-- =========
-- ALAIS -  a temporary name for a column or a table for a a specific query
-- =========

SELECT 
    p.title AS post_title,
    p.status,
    p.views ,
    u.name AS author_name ,
    c.body AS comment_body

FROM posts p
INNER JOIN users u ON p.user_id = u.id
LEFT JOIN comments c ON c.post_id = p.id -- Here we used LEFT JOIN cause there might be posts with no comments , if we had used INNER JOIN posts with no comments won't be displayed cause c.post_id = p.id will fail
ORDER BY p.views DESC;
