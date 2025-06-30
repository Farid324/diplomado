// src/routes/tasks.routes.js
import { Router } from "express";
import requireAuth from "../middlewares/requireAuth.js";
import { getTasksByUser, createTask } from "../controllers/tasks.controller.js";

const router = Router();

router
  .route("/")
  .get(requireAuth, getTasksByUser)
  .post(requireAuth, createTask);

export default router;