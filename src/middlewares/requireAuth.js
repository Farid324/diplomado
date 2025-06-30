// src/middlewares/requireAuth.js
import jwt from "jsonwebtoken";
import config from "../config/env.js";

export default function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded; // { id, username }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
}