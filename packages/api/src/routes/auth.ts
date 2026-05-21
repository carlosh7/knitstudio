import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { query } from "../db";

const JWT_SECRET = process.env.JWT_SECRET || "knitstudio-dev-secret-change-in-production";
const JWT_EXPIRES = "24h";

export const authRoutes = Router();

authRoutes.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "email and password required" });
    return;
  }
  try {
    const hash = await bcrypt.hash(password, 12);
    const id = crypto.randomUUID();
    await query(
      "INSERT INTO users (id, email, password_hash, role) VALUES ($1, $2, $3, $4)",
      [id, email, hash, "user"]
    );
    const token = jwt.sign({ userId: id, role: "user" }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
    res.status(201).json({ token, user: { id, email, role: "user" } });
  } catch {
    res.status(409).json({ error: "email already registered" });
  }
});

authRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "email and password required" });
    return;
  }
  try {
    const result = await query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];
    if (!user) {
      res.status(401).json({ error: "invalid credentials" });
      return;
    }
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      res.status(401).json({ error: "invalid credentials" });
      return;
    }
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "login failed" });
  }
});

export function authenticate(req: any, res: any, next: () => void) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ error: "no token provided" });
    return;
  }
  try {
    const payload = jwt.verify(header.slice(7), JWT_SECRET) as { userId: string; role: string };
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ error: "invalid token" });
  }
}

export function requireRole(...roles: string[]) {
  return (req: any, res: any, next: () => void) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ error: "insufficient permissions" });
      return;
    }
    next();
  };
}
