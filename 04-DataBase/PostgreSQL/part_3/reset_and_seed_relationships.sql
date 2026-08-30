CREATE EXTENSION IF NOT EXISTS pgcrypto;

DROP TABLE IF EXISTS post_tags;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS users;
-- TABLE DELETION ORDER MATTER FIRST CHILD THEN PARENT LAST

-- CHILD HOLDS PARENT'S ID REMEMBER
-- POST belongs to USER hence POST holds USER'S ID as a FOREIGN KEY
-- IF one doesn't depend on the other junction table is created and column will be the PK of each table and a 3rd col which is the composite key formed by joining the 2 ids

CREATE TABLE users(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL
);

CREATE TABLE posts(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES users(id),
    title TEXT NOT NULL ,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft' , 'public')),
    views INT NOT NULL DEFAULT 0 CHECK (views >= 0)
);

CREATE TABLE comments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id uuid NOT NULL REFERENCES posts(id),
    body TEXT NOT NULL

);


CREATE TABLE tags (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE
);


CREATE TABLE post_tags (
    post_id uuid NOT NULL REFERENCES posts(id),
    tag_id uuid NOT NULL REFERENCES tags(id),
    PRIMARY KEY (post_id , tag_id)
);


-- ============================================
-- USERS
-- ============================================
WITH new_users AS (
    INSERT INTO users (name)
    VALUES ('Alice'), ('Bob')
    RETURNING id, name
)
SELECT * FROM new_users;

-- ============================================
-- POSTS (grab user ids via subquery on name)
-- ============================================
INSERT INTO posts (user_id, title, status, views)
VALUES
    ((SELECT id FROM users WHERE name = 'Alice'), 'My First Post', 'public', 120),
    ((SELECT id FROM users WHERE name = 'Alice'), 'Draft Thoughts', 'draft', 0),
    ((SELECT id FROM users WHERE name = 'Bob'),   'Bob''s Intro',   'public', 45);

-- ============================================
-- COMMENTS (attach to Alice's first post)
-- ============================================
INSERT INTO comments (post_id, body)
VALUES
    ((SELECT id FROM posts WHERE title = 'My First Post'), 'Great post!'),
    ((SELECT id FROM posts WHERE title = 'My First Post'), 'Thanks for sharing.'),
    ((SELECT id FROM posts WHERE title = 'Bob''s Intro'),  'Welcome Bob!');

-- ============================================
-- TAGS
-- ============================================
INSERT INTO tags (name)
VALUES ('postgres'), ('tutorial'), ('life');

-- ============================================
-- POST_TAGS (many-to-many junction)
-- ============================================
INSERT INTO post_tags (post_id, tag_id)
VALUES
    ((SELECT id FROM posts WHERE title = 'My First Post'), (SELECT id FROM tags WHERE name = 'postgres')),
    ((SELECT id FROM posts WHERE title = 'My First Post'), (SELECT id FROM tags WHERE name = 'tutorial')),
    ((SELECT id FROM posts WHERE title = 'Bob''s Intro'),  (SELECT id FROM tags WHERE name = 'life'));

-- ============================================
-- VERIFY — see it all joined together
-- ============================================
SELECT u.name AS author, p.title, p.status, t.name AS tags
FROM posts p
JOIN users u ON p.user_id = u.id
LEFT JOIN post_tags pt ON pt.post_id = p.id
LEFT JOIN tags t ON t.id = pt.tag_id
ORDER BY u.name, p.title;



