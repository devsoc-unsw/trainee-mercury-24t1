import { Request, Response } from "express";
import { pool } from ".";

export const register = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!email) {
      return res.status(400).json({ error: "Email is empty" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password is empty" });
    }

    const userId = await pool.query(
      `
  INSERT INTO users(email, password)
  VALUES ($1, $2)
  RETURNING id
  `,
      [email, password],
    );

    await pool.query(
      `
    INSERT INTO goddle_stats(user_id)
    VALUES ($1)
    `,
      [userId],
    );

    return res.json({ message: "Registration succesful", userId });
  } catch (err) {
    if (err instanceof Error) {
      // PostgreSQL error code for unique violation
      const pgError = err as { code?: string };
      if (pgError.code === "23505") {
        res.status(409).json({ error: "Email already exists" });
      } else {
        return res.status(500).json({ error: "Server error " + err.message });
      }
    } else {
      console.error(err);
      return res.status(500).json({ error: "Server error " + err });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!email) {
      return res.status(400).json({ error: "Email is empty" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password is empty" });
    }

    const result = await pool.query(
      `
  SELECT email, password FROM Users
  WHERE email = $1

  `,
      [email],
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];
      if (user.password === password) {
        return res.json({ message: "Login succesful" });
      } else {
        return res.status(401).json({ error: "Wrong password" });
      }
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ error: "Server error " + err.message });
    }
    return res.status(500).json({ error: "Server error" + err });
  }
};
