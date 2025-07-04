// src/routes/login.routes.js
import { Router } from "express";
import { login } from "../controllers/login.controller.js";

const router = Router();

router.post("/", login);

export default router;