import { User } from "../models/user.js";
import { Task } from "../models/task.js";

function getUsers(req, res) {
  res.json({
    message: "Welcome to the Users API desde el controller",
  });
}

export default {
    getUsers,
};