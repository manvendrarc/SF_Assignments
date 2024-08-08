import { Pool } from 'pg';

const pool = new Pool({
  user: 'user1',
  host: 'localhost',
  database: 'users',
  password: 'Karnal@123',
  port: 5432,
});

export default pool;
