-- For learning purpose this DROP line shouln't be there in production.

DROP TABLE IF EXISTS basics.students;

-- PostgreSQL requires at least one column definition inside parentheses , but only () works

CREATE TABLE basics.students(
    -- SERIAL includes integer data type
    id SERIAL ,
    name TEXT NOT NULL ,
    email TEXT NOT NULL UNIQUE ,
    age INTEGER NOT NULL ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/*
column names are NOT case-sensitive if you write them without quotes.
PostgreSQL automatically converts unquoted identifiers (column/table names) to lowercase.
But if you wrote them inside "" it will be case sensetive
*/

INSERT INTO basics.students (name , email , age )
VALUES  ('Alice', 'alice@email.com' , 23),
        ('Bob', 'bob@email.com' , 30),
        ('Charlie', 'charlie@email.com' , 35);

SELECT * FROM basics.students;