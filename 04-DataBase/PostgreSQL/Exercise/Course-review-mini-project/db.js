import 'dotenv/config';
import { Pool } from 'pg';

const pool = new Pool({
    user : process.env.DB_USER ,
    password : process.env.DB_PASSWORD,
    host : process.env.DB_HOST ,
    port : process.env.DB_PORT ,
    database : process.env.DB_NAME  
});

// SELECT 1 doesn’t query your table.
//It just checks: “Can I successfully communicate with PostgreSQL?”

pool.query("SELECT 1")
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.error("Database connection failed", err));

export default pool;