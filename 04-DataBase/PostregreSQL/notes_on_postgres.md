#  PostgreSQL
### 1. PostgreSQL/Relational vs MongoDB/Non-relational

Relational databases like PostgreSQL enforce strict structure and relationships (like linked spreadsheets) ensuring data integrity, while non-relational databases like MongoDB offer flexible document storage prioritizing speed and scalability over rigid rules.

### 2. What is Supabase

Supabase is a backend-as-a-service platform built on top of PostgreSQL that adds authentication, instant APIs, real-time subscriptions, and storage to make PostgreSQL easier to use without writing backend code.

### 3. Can I use both and why does MongoDB feel easier

Yes, many applications use both—PostgreSQL for structured transactional data (users, orders, payments) and MongoDB for flexible data (product catalogs, user preferences)—with MongoDB feeling easier initially because it requires no upfront schema definition, but this flexibility trades away database-level data validation that PostgreSQL provides natively.

### 4. Doesn't MongoDB schema creation help

MongoDB schemas (like Mongoose) validate data only at the application level, meaning dirty data can still enter the database from other sources, whereas PostgreSQL enforces schema rules at the database level itself, making it impossible to insert invalid data regardless of where it comes from.

## psql 
CREATE DATABASE firstPostgresDB vs CREATE DATABASE 'firstPostgresDB'
- the first one will be saved as lowercase while the second one will be saved as it was written since its inside a quotation mark

Best Practice:
- Always use lowercase for database names, table names, and column names in PostgreSQL to avoid this confusion.
