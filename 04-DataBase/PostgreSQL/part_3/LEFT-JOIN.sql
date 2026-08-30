-- ============================================
-- LFFT JOIN - KEEPS ALL THE  ROWS FROM THE LEFT TABLE.
-- ============================================


-- SELECT
--     posts.title AS post_title,
--     posts.views,
--     posts.status,
--     comments.body AS comments
-- FROM posts
-- LEFT JOIN comments ON posts.id = comments.post_id

-- ORDER BY posts.views DESC;
-- Because a post might / might NOT have a comment so in order to see each post's comment status we used LEFT JOIN , rows that doesn't have comments will be null in the comments column hence it will show nothing



-- SELECT posts.title AS post_title , tags.name AS tag_name
-- FROM posts 
-- INNER JOIN post_tags
-- ON posts.id = post_tags.post_id
-- INNER JOIN tags
-- ON post_tags.tag_id = tags.id;