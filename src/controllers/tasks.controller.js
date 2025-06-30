// src/controllers/tasks.controller.js
import { Task } from "../models/task.js";

export async function getTasksByUser(req, res, next) {
  try {
    const userId = req.user.id;

    const tasks = await Task.findAll({
      where: { userId },
      attributes: ['id', 'name', 'done'],
      order: [['id', 'ASC']],
    });

    res.json(tasks);
  } catch (error) {
    next(error);
  }
}

export async function createTask(req, res, next) {
  try {
    const { name } = req.body;
    const userId = req.user.id;

    const newTask = await Task.create({
      name,
      userId,
    });

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
}