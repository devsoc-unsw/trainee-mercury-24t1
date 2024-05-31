import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Pool } from "pg";
import {
  getGoddleStats,
  login,
  register,
  updateGoddleStats,
} from "./controller";
import { Request, Response } from "express";

dotenv.config();

const config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT as string),
};

const corsOptions = {
  origin: "http://170.64.174.149",
};

console.log(config);

export const pool = new Pool(config);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(corsOptions));
app.use(express.json());

// Testing connection
app.get("/test", async (req: Request, res: Response) => {
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
app.post("/get-goddle-stats", getGoddleStats);
app.post("/update-goddle-stats", updateGoddleStats);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
