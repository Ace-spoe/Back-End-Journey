CREATE EXTENSION IF NOT EXISTS prcrypto;

DROP TABLE IF EXISTS post_tags;
DROP TABLE IF EXISTS commnets;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS users;


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
    id uuid PRIMARY KEY gen_random_uuid(),
    post_id uuid NOT NULL REFERENCES posts(id),
    body TEXT NOT NULL

);


CREATE TABLE tags (
    id uuid PRIMARY KEY gen_random_uuid(),
    name TEXT NOT NULL UNIQUE
);


CREATE TABLE post_tags (
    post_id uuid NOT NULL REFERENCES posts(id),
    tag_id uuid NOT NULL REFERENCES tags(id),
    PRIMARY KEY (post_id , tag_id)
);




