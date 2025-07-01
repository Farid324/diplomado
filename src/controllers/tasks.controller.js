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

export async function getTaskById(req, res, next) {
  try {
    const userId = req.user.id;
    const taskId = req.params.id;

    const task = await Task.findOne({
      where: { id: taskId, userId }, // ✅ solo si pertenece al usuario
      attributes: ['name', 'done'],
    });

    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
}

export async function updateTaskName(req, res, next) {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "El campo 'name' es requerido" });
    }

    const result = await Task.update(
      { name },
      {
        where: {
          id: taskId,
          userId, // asegura que la tarea le pertenezca al usuario
        },
      }
    );

    res.json(result); // devuelve [1] si actualizó correctamente
  } catch (error) {
    next(error);
  }
}

export async function updateTaskDone(req, res, next) {
  try {
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ message: "Body vacío o incorrecto" });
    }

    const { done } = req.body;
    const taskId = req.params.id;
    const userId = req.user.id;

    if (typeof done !== 'boolean') {
      return res.status(400).json({ message: "El campo 'done' debe ser booleano" });
    }

    const result = await Task.update(
      { done },
      {
        where: {
          id: taskId,
          userId,
        },
      }
    );

    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function deleteTask(req, res, next) {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;

    const deletedCount = await Task.destroy({
      where: {
        id: taskId,
        userId,
      },
    });

    if (deletedCount === 0) {
      return res.status(404).json({ message: "Tarea no encontrada o no autorizada" });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
