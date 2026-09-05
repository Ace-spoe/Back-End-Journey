-- DROP TABLE IF EXISTS reviews;
-- DROP TABLE IF EXISTS courses;
-- DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY ,
    name TEXT NOT NULL
);

CREATE TABLE courses (
    id SERIAL PRIMARY KEY ,
    title TEXT NOT NULL,
    code TEXT NOT NULL UNIQUE
);

CREATE TABLE  reviews (
    id SERIAL PRIMARY KEY ,
    user_id INT NOT NULL REFERENCES users(id),
    course_id INT NOT NULL REFERENCES courses(id),
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    body TEXT
    UNIQUE (user_id, course_id) -- this was added later after making the assumption that a user can not rate the same course twice
);


