import pg from "pg";
import dotenv from 'dotenv';

const { Pool } = pg;
dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/leadcapture'
});

