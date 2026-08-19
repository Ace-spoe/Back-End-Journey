
-- db->schema->table->rows
-- By default every DB got one schema called public and when you cretae a table with out specifying the search-path or expicitly specify the schema name it goes to public

CREATE SCHEMA IF NOT EXISTS basics;

-- Think of extensions as a folder with extra handy features that postgres doesn't have by default

CREATE EXTENSION IF NOT EXISTS pgCrypto; 


SELECT schema_name
FROM information_schema.schemata
ORDER BY schema_name