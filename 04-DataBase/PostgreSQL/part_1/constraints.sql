
DROP TABLE IF EXISTS basics.accounts;

CREATE TABLE basics.accounts(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL ,
    email TEXT NOT NULL UNIQUE,
    age INT NOT NULL CHECK(age >= 18),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO basics.accounts(name , email , age)
--VALUES ('Adem','Adem@gmail.com', 12); --ERROR:  new row for relation "accounts" violates check constraint "accounts_age_check"
VALUES ('Adem','Adem@gmail.com', 20);

