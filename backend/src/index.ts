import express from "express";
import { Pool } from "pg";
import { register } from "./controller";

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT as string),
});
const app = express();
const PORT = process.env.PORT || 3000;

app.post("/register", register);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
