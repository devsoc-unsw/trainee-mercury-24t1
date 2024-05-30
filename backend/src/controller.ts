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

    const userResults = await pool.query(
      `
  INSERT INTO users(email, password)
  VALUES ($1, $2)
  RETURNING id
  `,
      [email, password],
    );

    const userId = userResults.rows[0].id;

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
  SELECT id, email, password FROM Users
  WHERE email = $1
  `,
      [email],
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];
      if (user.password === password) {
        return res.json({ message: "Login succesful", userId: user.id });
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

export const getGoddleStats = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;

    if (!userId) {
      return res.status(400).json({ error: "User id not provided" });
    }

    const stats = await pool.query(
      `
  SELECT top_attempt, top_time, games_played
  FROM goddle_stats
  WHERE user_id = $1
  `,
      [userId],
    );

    if (stats.rows.length <= 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const userStats = stats.rows[0];

    return res.json({
      topAttempt: userStats.top_attempt,
      topTime: userStats.top_time,
      gamesPlayed: userStats.games_played,
    });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ error: "Server error " + err.message });
    }
    return res.status(500).json({ error: "Server error" + err });
  }
};

export const updateGoddleStats = async (req: Request, res: Response) => {};
