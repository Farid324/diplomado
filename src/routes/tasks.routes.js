// src/routes/tasks.routes.js
import { Router } from "express";
import requireAuth from "../middlewares/requireAuth.js";
import { getTasksByUser, createTask, getTaskById, updateTaskName, updateTaskDone, deleteTask } from "../controllers/tasks.controller.js";

const router = Router();

router
  .route("/")
  .get(requireAuth, getTasksByUser)
  .post(requireAuth, createTask);

router
  .route("/:id")
  .get(requireAuth, getTaskById)
  .put(requireAuth, updateTaskName)
  .patch(requireAuth, updateTaskDone)
  .delete(requireAuth, deleteTask);
export default router;