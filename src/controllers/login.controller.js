// src/controllers/login.controller.js
import { User } from "../models/user.js";
import { comparar } from "../common/bycript.js";
import jwt from "jsonwebtoken";
import config from "../config/env.js";

export async function login(req, res, next) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const validPassword = await comparar(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      config.JWT_SECRET,
      { expiresIn: eval(config.JWT_EXPIRES_SECONDS) }
    );

    res.json({ token });
  } catch (error) {
    next(error);
  }
}