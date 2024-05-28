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

    await pool.query(
      `
  INSERT INTO Users(email, password)
  VALUES ($1, $2)
  `,
      [email, password],
    );

    return res.json({ message: "Registration succesful" });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};
