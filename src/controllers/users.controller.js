//src/controllers/users.controller.js
import { User } from "../models/user.js";
import { Task } from "../models/task.js";
import logger from "../logs/logger.js";
import { Status } from "../constants/index.js";
import { encriptar } from "../common/bycript.js";
import { Op } from "sequelize";
async function getUsers(req, res, next) {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'password', 'status'],
      order: [['id', 'DESC']],
      where: {
        status: Status.ACTIVE,
      },
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
}

async function createUser(req, res, next) {
  const { username, password } = req.body;
  try {
    const user = await User.create({
      username,
      password,
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
}

async function getUser(req, res, next) {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      attributes: ['username', 'status'],
      where: {
        id,
      },
    });
    if (!user) res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  const { id } = req.params;
  const { username, password } = req.body;

  try {
    if (!username && !password) {
      return res.status(400).json({ message: 'Username or password is required' });
    }

    const dataToUpdate = {};
    if (username) dataToUpdate.username = username;
    if (password) dataToUpdate.password = await encriptar(password);

    const result = await User.update(dataToUpdate, {
      where: { id },
    });

    res.json(result); // 👈 devuelve [1], como en la imagen del enunciado
  } catch (error) {
    next(error);
  }
}

async function updateUserStatus(req, res, next) {
  const { id } = req.params;
  const { status } = req.body;

  try {
    if (!status || ![Status.ACTIVE, Status.INACTIVE].includes(status)) {
      return res.status(400).json({ message: 'Invalid or missing status' });
    }

    const [updatedRows] = await User.update(
      { status },
      { where: { id } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedUser = await User.findOne({ where: { id } });
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
}
async function deleteUser(req, res, next) {
  const { id } = req.params;

  try {
    const [updatedRows] = await User.update(
      { status: Status.INACTIVE },
      { where: { id } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted (status set to inactive)' });
  } catch (error) {
    next(error);
  }
}
async function getUserTasks(req, res, next) {
  const { id } = req.params;

  try {
    const user = await User.findOne({
      where: { id },
      attributes: ['username'],
      include: {
        model: Task,
        attributes: ['name', 'done'],
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({
      username: user.username,
      tasks: user.tasks,
    });
  } catch (error) {
    next(error);
  }
}

async function getUsersPaginated(req, res, next) {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      orderBy = 'id',
      orderDir = 'DESC',
    } = req.query;

    const offset = (page - 1) * limit;
    const whereClause = search
      ? { username: { [Op.iLike]: `%${search}%` } }
      : {};

    const { count: total, rows: users } = await User.findAndCountAll({
      attributes: ['id', 'username', 'status'],
      where: whereClause,
      order: [[orderBy, orderDir]],
      limit: Number(limit),
      offset: Number(offset),
    });

    const pages = Math.ceil(total / limit);

    res.json({
      total,
      page: Number(page),
      pages,
      data: users,
    });
  } catch (error) {
    next(error);
  }
}
export default {
    getUsers,
    createUser,
    getUser,
    updateUser,
    updateUserStatus,
    deleteUser,
    getUserTasks,
    getUsersPaginated

};
