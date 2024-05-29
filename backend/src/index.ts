import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Pool } from "pg";
import { login, register } from "./controller";
import { Request, Response } from "express";

dotenv.config();

const config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT as string),
};

console.log(config);

export const pool = new Pool(config);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/", async (req: Request, res: Response) => {
  try {
    await pool.query("SELECT 1");
    console.log("Database connection successful");
    return res.json({ message: "Connection successful" });
  } catch (err) {
    console.error("Database connection error:", err);
    return res.status(500).json({ error: "Connection failed" + err });
  }
});
app.post("/register", register);
app.post("/login", login);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
