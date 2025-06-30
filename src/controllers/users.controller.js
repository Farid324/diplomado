//src/controllers/users.controller.js
import { User } from "../models/user.js";
import { Task } from "../models/task.js";
import logger from "../logs/logger.js";
import { Status } from "../constants/index.js";
async function getUsers(req, res) {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "password", "status"],
      order: [["id", "DESC"]],
      where: {
        status: Status.ACTIVE,
      }
    });
    res.json(users);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message });
  }
}

async function createUser(req, res) {
  const { username, password } = req.body;
  try {
    const user = await User.create({
      username,
      password,
    });

    res.json(user);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message });
  }
}

export default {
    getUsers,
    createUser
};