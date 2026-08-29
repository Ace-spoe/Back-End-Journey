DROP TABLE IF EXISTS basics.dataTypes;

CREATE EXTENSION IF NOT EXISTS uuid-ossp; -- EXTENSION NEEDED TO USE uuid_generate_v4() 

CREATE TYPE mood AS ENUM ('happy', 'sad', 'neutral', 'angry'); -- cretaing the enum type

CREATE TABLE basics.dataTypes(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),  -- UUID with auto-generate,
    auto_Increment SERIAL , -- generates auto increamenting numbers starting from 1 but can be altered using ALTER SEQUENCE..
    name TEXT ,
    wordWith10Char VARCHAR(10),
    int_value INTEGER , -- INT also works , they are the same
    float_value FLOAT DEFAULT 31.141234343 , -- 8 bytes, more precise , same as DOUBLE PRECSION
    real_value REAL DEFAULT 12.2344 , -- 4 bytes , less precise
    price NUMERIC(3,2) DEFAULT 3.59 , -- EXACT DECIMAL max value = 9.99
    isTrue BOOLEAN DEFAULT true , -- true/false but NOT CASE-SENSETIVE
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- date + time , CURRENT_TIMESTAMP is (sql-standard) while NOW() is postgres specifics ,they are the SAME
    current_mood mood DEFAULT 'happy' ,
    JSON_holder JSONB DEFAULT '{}', -- JSONB is indexed and faster than JSON
    hobbies TEXT[] -- array of texts insert using the keyword ARRAY[] or {"text1" , "text2",..}
);